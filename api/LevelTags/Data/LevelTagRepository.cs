using Microsoft.EntityFrameworkCore;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelTags.Models;

namespace Mouse.NET.LevelTags.Data;

public class LevelTagRepository : ILevelTagRepository
{
    private readonly MouseDbContext context;

    public LevelTagRepository(MouseDbContext context)
    {
        this.context = context;
    }

    public async Task<PagedResult<LevelTagRelation>> GetCollection(LevelTagCollectRequest request)
    {
        var query = this.context.LevelTagRelations
            .AsNoTracking()
            .Include(r => r.Level)
            .Include(r => r.Tag)
            .Include(r => r.User)

            .AsQueryable();

        if (request.LevelId != null)
        {
            query = query.Where(r => r.LevelId == request.LevelId);
        }

        if (request.TagId != null)
        {
            query = query.Where(r => r.TagId == request.TagId);
        }

        if (request.UserId != null)
        {
            query = query.Where(r => r.UserId == request.UserId);
        }

        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            var q = request.Query.Trim().ToLower();
            query = query.Where(r =>
                r.Level.Name.ToLower().Contains(q) ||
                r.Tag.Name.ToLower().Contains(q) ||
                (r.User != null && r.User.UserName != null && r.User.UserName.ToLower().Contains(q))
            );
        }

        query = ApplySorting(query, request);
        return await PaginationExtensions.ToPagedResult(query, request.Page, request.Size);
    }

    private static IQueryable<LevelTagRelation> ApplySorting(IQueryable<LevelTagRelation> query, PaginateRequest request)
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
            "tag" => isDesc ? query.OrderByDescending(x => x.Tag.Name) : query.OrderBy(x => x.Tag.Name),
            "level" => isDesc ? query.OrderByDescending(x => x.Level.Name) : query.OrderBy(x => x.Level.Name),
            "user" => isDesc ? query.OrderByDescending(x => x.User.UserName) : query.OrderBy(x => x.User.UserName),
            "createdUtcDate" => isDesc ? query.OrderByDescending(x => x.CreatedUtcDate) : query.OrderBy(x => x.CreatedUtcDate),
            _ => query.OrderByDescending(x => x.CreatedUtcDate)
        };
    }

    public async Task<LevelTagRelation?> GetById(long id)
    {
        return await this.context.LevelTagRelations
            .AsNoTracking()
            .Include(r => r.Level)
            .Include(r => r.Tag)
            .Include(r => r.User)
            .Where(r => r.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<LevelTagRelation> Create(LevelTagRelation relation)
    {
        this.context.LevelTagRelations.Add(relation);
        await this.context.SaveChangesAsync();

        var created = await this.context.LevelTagRelations
            .AsNoTracking()
            .Include(r => r.Level)
            .Include(r => r.Tag)
            .Include(r => r.User)
            .Where(r => r.Id == relation.Id)
            .FirstAsync();

        return created;
    }

    public async Task<LevelTagRelation?> Update(long id, int? levelId, int? tagId, int? userId)
    {
        var relation = await this.context.LevelTagRelations
            .Where(r => r.Id == id)
            .FirstOrDefaultAsync();

        if (relation == null)
        {
            return null;
        }

        if (levelId != null)
        {
            relation.LevelId = levelId.Value;
        }

        if (tagId != null)
        {
            relation.TagId = tagId.Value;
        }

        relation.UserId = userId;

        await this.context.SaveChangesAsync();

        return await this.context.LevelTagRelations
            .AsNoTracking()
            .Include(r => r.Level)
            .Include(r => r.Tag)
            .Include(r => r.User)
            .Where(r => r.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task Delete(long id)
    {
        var relation = await this.context.LevelTagRelations
            .Where(r => r.Id == id)
            .FirstOrDefaultAsync();

        if (relation != null)
        {
            this.context.LevelTagRelations.Remove(relation);
            await this.context.SaveChangesAsync();
        }
    }

    public async Task Remove(long id)
    {
        await this.Delete(id);
    }
}
