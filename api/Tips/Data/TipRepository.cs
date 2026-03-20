using Microsoft.EntityFrameworkCore;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;

namespace Mouse.NET.Tips.Data;

public class TipRepository : ITipRepository
{
    private readonly MouseDbContext context;
    
    public TipRepository(MouseDbContext context)
    {
        this.context = context;
    }
    
    public async Task<PagedResult<TipEntity>> GetTipCollection(PaginateRequest request)
    {
        var query = this.context.Tips
            .Include(tip => tip.User)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim();
            query = query.Where(tip =>
                EF.Functions.Like(tip.Title, "%" + search + "%") ||
                EF.Functions.Like(tip.Text, "%" + search + "%")
            );
        }

        query = ApplySorting(query, request);

        return await PaginationExtensions.ToPagedResult(query, request.Page, request.Size);
    }

    private static IQueryable<TipEntity> ApplySorting(IQueryable<TipEntity> query, PaginateRequest request)
    {
        var field = request.SortField;
        var direction = request.SortDirection;

        if (string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(direction))
        {
            return query.OrderByDescending(x => x.CreatedUtcDate);
        }

        var isDesc = string.Equals(direction, "desc", StringComparison.OrdinalIgnoreCase);

        return field switch
        {
            "title" => isDesc ? query.OrderByDescending(x => x.Title) : query.OrderBy(x => x.Title),
            "text" => isDesc ? query.OrderByDescending(x => x.Text) : query.OrderBy(x => x.Text),
            "createdUtcDate" => isDesc ? query.OrderByDescending(x => x.CreatedUtcDate) : query.OrderBy(x => x.CreatedUtcDate),
            "modifiedUtcDate" => isDesc ? query.OrderByDescending(x => x.ModifiedUtcDate) : query.OrderBy(x => x.ModifiedUtcDate),
            "username" => isDesc ? query.OrderByDescending(x => x.User.UserName) : query.OrderBy(x => x.User.UserName),
            _ => query.OrderByDescending(x => x.CreatedUtcDate)
        };
    }
    
    public async Task<TipEntity?> GetTip(int tipId)
    { 
       return await this.context.Tips.Include(tip => tip.User).FirstOrDefaultAsync(level => level.Id.Equals(tipId));
    }

    public async Task<TipEntity?> CreateTip(TipEntity tip)
    {
        await this.context.Tips.AddAsync(tip);
        await this.context.SaveChangesAsync();
        
        return await this.GetTip(tip.Id);
    }

    public async Task<TipEntity?> UpdateTip(TipEntity tip)
    {
        this.context.Entry(tip).State = EntityState.Modified;
        await this.context.SaveChangesAsync();
        
        return await this.GetTip(tip.Id);
    }

    public async Task DeleteTip(TipEntity tip)
    {
        this.context.Tips.Remove(tip);
        await this.context.SaveChangesAsync();
    }

    public async Task<ICollection<TipEntity>> GetTipsById(ICollection<int> tipIds)
    {
        return await this.context.Tips.Where(tip => tipIds.Contains(tip.Id)).ToListAsync();
    }

}