using Microsoft.EntityFrameworkCore;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelComments.Models;

namespace Mouse.NET.LevelComments.Data;

public class LevelCommentRepository : ILevelCommentRepository
{
    private readonly MouseDbContext context;
    
    public LevelCommentRepository(MouseDbContext context)
    {
        this.context = context;
    }
    
    public async Task<ICollection<LevelCommentEntity>> GetLevelCommentCollection(int? levelId, int? userId)
    {
        var commentsQuery = this.context.LevelComments.AsQueryable();
        if (levelId != null)
        {
            commentsQuery = commentsQuery.Where(comment => comment.Level.Id == levelId);
        }
        if (userId != null)
        {
            commentsQuery = commentsQuery.Where(comment => comment.User.Id == userId);
        }
        return await commentsQuery
            .Include(comment => comment.User)
            .Include(comment => comment.Level)
            .OrderBy(level => level.CreatedUtcDate)
            .ToListAsync();
    }

    public async Task<PagedResult<LevelCommentEntity>> GetPagedCollection(LevelCommentCollectPagedRequest request)
    {
        var query = this.context.LevelComments
            .AsNoTracking()
            .Include(c => c.User)
            .Include(c => c.Level)
            .AsQueryable();

        if (request.LevelId != null)
        {
            query = query.Where(c => c.LevelId == request.LevelId);
        }

        if (request.UserId != null)
        {
            query = query.Where(c => c.UserId == request.UserId);
        }

        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            var q = request.Query.Trim().ToLower();
            query = query.Where(c => c.Text.ToLower().Contains(q));
        }

        return await PaginationExtensions.ToPagedResult(query.OrderByDescending(c => c.CreatedUtcDate), request.Page, request.Size);
    }
    
    public async Task<LevelCommentEntity?> GetLevelComment(int levelId)
    { 
       return await this.context.LevelComments.Include(comment => comment.User).FirstOrDefaultAsync(level => level.Id.Equals(levelId));
    }

    public async Task<LevelCommentEntity?> CreateLevelComment(LevelCommentEntity level)
    {
        await this.context.LevelComments.AddAsync(level);
        await this.context.SaveChangesAsync();
        
        return await this.GetLevelComment(level.Id);
    }

    public async Task<LevelCommentEntity> CreateLevelCommentAdmin(LevelCommentEntity levelComment)
    {
        this.context.LevelComments.Add(levelComment);
        await this.context.SaveChangesAsync();

        var created = await this.context.LevelComments
            .AsNoTracking()
            .Include(c => c.User)
            .Include(c => c.Level)
            .Where(c => c.Id == levelComment.Id)
            .FirstAsync();

        return created;
    }
    

    public async Task<LevelCommentEntity?> UpdateLevelComment(LevelCommentEntity level)
    {
        this.context.Entry(level).State = EntityState.Modified;
        await this.context.SaveChangesAsync();
        
        return await this.GetLevelComment(level.Id);
    }

    public async Task<LevelCommentEntity?> UpdateLevelCommentAdmin(int id, int? levelId, int? userId, string? text)
    {
        var comment = await this.context.LevelComments
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();

        if (comment == null)
        {
            return null;
        }

        if (levelId != null)
        {
            comment.LevelId = levelId.Value;
        }

        if (userId != null)
        {
            comment.UserId = userId.Value;
        }

        if (text != null)
        {
            comment.Text = text;
        }

        await this.context.SaveChangesAsync();

        return await this.context.LevelComments
            .AsNoTracking()
            .Include(c => c.User)
            .Include(c => c.Level)
            .Where(c => c.Id == id)
            .FirstOrDefaultAsync();
    }
    

    public async Task DeleteLevelComment(LevelCommentEntity level)
    {
        this.context.LevelComments.Remove(level);
        await this.context.SaveChangesAsync();
    }

    public async Task DeleteBulk(ICollection<int> levelCommentIds)
    {
        var entities = await this.context.LevelComments
            .Where(c => levelCommentIds.Contains(c.Id))
            .ToListAsync();

        if (entities.Count == 0)
        {
            return;
        }

        this.context.LevelComments.RemoveRange(entities);
        await this.context.SaveChangesAsync();
    }
    

    public async Task<ICollection<LevelCommentEntity>> GetLevelCommentsById(ICollection<int> levelCommentIds)
    {
        return await this.context.LevelComments.Where(levelComment => levelCommentIds.Contains(levelComment.Id)).ToListAsync();
    }
    
}