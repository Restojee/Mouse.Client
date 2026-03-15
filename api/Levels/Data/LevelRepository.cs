using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelComments.Models;
using Mouse.NET.Levels.Models;

namespace Mouse.NET.Levels.Data;

public class LevelRepository : ILevelRepository
{
    private readonly MouseDbContext context;
    
    public LevelRepository(MouseDbContext context)
    {
        this.context = context;
    }

    public async Task<List<LevelFavoriteEntity>> GetLevelFavoriteCollection(FavoriteCollectRequest request)
    {
        var favoritesQuery = this.context.LevelFavorites.AsQueryable();
        if (request.levelId != null)
        {
            favoritesQuery = favoritesQuery.Where(favorite => favorite.Level.Id == request.levelId);
        }
        if (request.userId != null)
        {
            favoritesQuery = favoritesQuery.Where(favorite => favorite.User.Id == request.userId);
        }
        return await favoritesQuery
            .Include(favorite => favorite.User)
            .Include(favorite => favorite.Level)
            .OrderBy(favorite => favorite.CreatedUtcDate)
            .ToListAsync();
    }

    public async Task<List<LevelCompletedEntity>> GetLevelCompletedCollection(CompletedCollectRequest request)
    {
        var completedQuery = this.context.LevelCompleted.AsQueryable();
        if (request.levelId != null)
        {
            completedQuery = completedQuery.Where(completed => completed.Level.Id == request.levelId);
        }
        if (request.userId != null)
        {
            completedQuery = completedQuery.Where(completed => completed.User.Id == request.userId);
        }
        return await completedQuery
            .Include(completed => completed.User)
            .Include(completed => completed.Level)
            .OrderByDescending(completed => completed.CreatedUtcDate)
            .ToListAsync();
    }

    public async Task<PagedResult<LevelEntity>> GetLevelCollection(LevelCollectionGetRequest request)
    {
        var userId = request.UserId.GetValueOrDefault();
        var query = this.context.Levels
            .Select(level => new LevelEntity
            {
                Id = level.Id,
                Description = level.Description,
                Name = level.Name,
                User = level.User,
                Tags = level.Tags,
                CompletedCount = level.Completed.Select(c => c.Id).ToList().Count,
                VisitsCount = level.Visits.Select(v => v.Id).ToList().Count,
                FavoritesCount = level.Favorites.Select(f => f.Id).ToList().Count,
                CommentsCount = level.Comments.Select(c => c.Id).ToList().Count,
                CreatedUtcDate = level.CreatedUtcDate,
                ModifiedUtcDate = level.ModifiedUtcDate,
                IsCompletedByUser = level.Completed.Select(c => c.User.Id).Any(user => user == userId),
                IsFavoriteByUser = level.Favorites.Select(f => f.User.Id).Any(user => user == userId),
                Image = level.Image,
            });

        if (request.UserId != null && request.IsCreatedByUser.GetValueOrDefault())
        {
            query = LevelRepositoryFilters.GetFilterByUserQuery(query, request.UserId.GetValueOrDefault());
        }
        
        if (request.IsCompleted != null)
        {
            query = LevelRepositoryFilters.GetFilterByCompletedQuery(this.context, query, request.UserId.GetValueOrDefault(), request.IsCompleted.GetValueOrDefault());
        }
        
        if (request.IsFavorite != null)
        {
            query = LevelRepositoryFilters.GetFilterByFavoriteQuery(this.context, query, request.UserId.GetValueOrDefault());
        }
        
        if (request.HasNote != null)
        {
            query = LevelRepositoryFilters.GetFilterByNoteQuery(this.context, query, request.UserId.GetValueOrDefault());
        }
        
        if (request.TagIds != null)
        {
            query = LevelRepositoryFilters.GetFilterByTags(query, request.TagIds);
        }
        
        if (request.Name != null)
        {
            query = LevelRepositoryFilters.GetFilterByName(query, request.Name);
        }

        if (request.Description != null)
        {
            query = LevelRepositoryFilters.GetFilterByDescription(query, request.Description);
        }
                
        if (request.IsWithComment != null)
        {
            query = LevelRepositoryFilters.GetFilterByCommentQuery(this.context, query, request.UserId.GetValueOrDefault());
        }

        var levels = await PaginationExtensions.ToPagedResult(query.OrderByDescending(level => level.CreatedUtcDate), request.Page, request.Size);

        return levels;
    }
    
    public async Task<LevelEntity?> GetLevel(int levelId, int? userId = null)
    {
        return await this.context.Levels
            .Include(level => level.User)
            .Include(level => level.Completed)
            .ThenInclude(completed => completed.User)
            .Include(level => level.Comments)
            .Select(level => new LevelEntity
            {
                Id = level.Id,
                Description = level.Description,
                Name = level.Name,
                User = level.User,
                Tags = level.Tags,
                CreatedUtcDate = level.CreatedUtcDate,
                ModifiedUtcDate = level.ModifiedUtcDate,
                Completed = level.Completed,
                Notes = level.Notes.Where(note => note.User.Id == userId.GetValueOrDefault()).ToList(),
                CompletedCount = level.Completed.Select(c => c.Id).ToList().Count,
                VisitsCount = level.Visits.Select(v => v.Id).ToList().Count,
                FavoritesCount = level.Favorites.Select(f => f.Id).ToList().Count,
                CommentsCount = level.Comments.Select(c => c.Id).ToList().Count,
                IsCompletedByUser = level.Completed.Select(c => c.User.Id).Any(user => user == userId),
                IsFavoriteByUser = level.Favorites.Select(f => f.User.Id).Any(user => user == userId),
                Image = level.Image,
            })
            .Where(level => level.Id == levelId)
            .FirstOrDefaultAsync();
    }

    public async Task<LevelEntity?> CreateLevel(LevelEntity level)
    {
        this.context.Levels.Add(level);
        await this.context.SaveChangesAsync();
        
        return await this.GetLevel(level.Id);
    }

    public async Task<LevelEntity?> UpdateLevel(LevelEntity level)
    {
        this.context.Entry(level).State = EntityState.Modified;
        await this.context.SaveChangesAsync();
        
        return await this.GetLevel(level.Id);
    }

    public async Task DeleteLevel(LevelEntity level)
    {
        this.context.Levels.Remove(level);
        await this.context.SaveChangesAsync();
    }
    
    public async Task ClearLevelTags(int levelId)
    {
        this.context.LevelTagRelations.RemoveRange(this.context.LevelTagRelations.Where(relation => levelId == relation.LevelId));
        await this.context.SaveChangesAsync();
    }

    public async Task<LevelEntity?> SetLevelTags(LevelEntity level, ICollection<int> tagIds)
    {
        await ClearLevelTags(level.Id);
        foreach (var tagId in tagIds)
        {
            if (await this.context.Tags.Where(tag => tag.Id == tagId).FirstOrDefaultAsync() != null)
            {
                await this.context.LevelTagRelations.AddAsync(new LevelTagRelation { TagId = tagId, LevelId = level.Id });
            }
        }
        await this.context.SaveChangesAsync();
        return await this.GetLevel(level.Id);
    }

    public async Task<LevelNoteEntity?> GetLevelNote(int levelId, int userId)
    {
        return await this.context.LevelNotes
            .Where(note => note.Level.Id == levelId && note.User.Id == userId)
            .FirstOrDefaultAsync();
    }

    public async Task<LevelNoteEntity?> GetLevelNoteById(int noteId)
    {
        return await this.context.LevelNotes
            .Include(n => n.User)
            .Include(n => n.Level)
            .FirstOrDefaultAsync(n => n.Id == noteId);
    }

    public async Task<List<LevelNoteEntity>> CollectLevelNotes(int? userId, int? levelId)
    {
        var query = this.context.LevelNotes
            .AsNoTracking()
            .Include(n => n.User)
            .Include(n => n.Level)
            .AsQueryable();

        if (userId.HasValue)
        {
            query = query.Where(n => n.UserId == userId.Value);
        }

        if (levelId.HasValue)
        {
            query = query.Where(n => n.LevelId == levelId.Value);
        }

        return await query
            .OrderByDescending(n => n.CreatedUtcDate)
            .ToListAsync();
    }

    public async Task UpdateLevelNote(LevelNoteEntity note)
    {
        this.context.Entry(note).State = EntityState.Modified;
        await this.context.SaveChangesAsync();
    }
    
    public async Task CreateLevelNote(LevelNoteEntity note)
    {
        await this.context.LevelNotes.AddAsync(note);
        await this.context.SaveChangesAsync();
    }

    public async Task RemoveLevelNotes(int[] noteIds)
    {
        var toRemove = await this.context.LevelNotes.Where(n => noteIds.Contains(n.Id)).ToListAsync();
        if (toRemove.Count > 0)
        {
            this.context.LevelNotes.RemoveRange(toRemove);
            await this.context.SaveChangesAsync();
        }
    }

    public async Task<LevelCompletedEntity?> CompleteLevel(LevelCompletedEntity completed)
    {
        await this.context.LevelCompleted.AddAsync(completed);
        await this.context.SaveChangesAsync();
        return await this.GetCompletedLevel(completed.Id, completed.UserId);
    }
    
    public async Task UnCompleteLevel(LevelCompletedEntity completed)
    {
        this.context.LevelCompleted.Remove(completed);
        await this.context.SaveChangesAsync();
    }
    
    public async Task FavoriteLevel(LevelFavoriteEntity favorite)
    {
        await this.context.LevelFavorites.AddAsync(favorite);
        await this.context.SaveChangesAsync();
    }
    
    public async Task UnFavoriteLevel(LevelFavoriteEntity favorite)
    {
        this.context.LevelFavorites.Remove(favorite);
        await this.context.SaveChangesAsync();
    }
    
    public async Task<LevelFavoriteEntity?> GetFavoriteLevel(int levelId, int userId)
    {
        return await this.context.LevelFavorites.Where(favorite => favorite.Level.Id == levelId && favorite.User.Id == userId).FirstOrDefaultAsync();
    }
    
    public async Task<LevelCompletedEntity?> GetCompletedLevel(int completedId, int userId)
    {
        return await this.context.LevelCompleted
            .Where(completed => completed.Id == completedId && completed.User.Id == userId)
            .Include(completed => completed.User)
            .FirstOrDefaultAsync();
    }
    
    public async Task<LevelCompletedEntity?> GetCompletedLevel(int completedId)
    {
        return await this.context.LevelCompleted.Where(completed => completed.Id == completedId).FirstOrDefaultAsync();
    }
    
    public async Task CreateLevelVisit(LevelVisitEntity visit)
    {
        await this.context.LevelVisits.AddAsync(visit);
        await this.context.SaveChangesAsync();
    }

    public async Task CreateLevelTags(int[] levelIds, int[] tagIds, int? userId)
    {
        foreach (var levelId in levelIds)
        {
            foreach (var tagId in tagIds)
            {
                if (await this.context.LevelTagRelations.Where(tag => tag.LevelId == levelId && tag.TagId == tagId).FirstOrDefaultAsync() == null)
                {
                    await this.context.LevelTagRelations.AddAsync(new LevelTagRelation()
                    {
                        TagId = tagId,
                        LevelId = levelId,
                        UserId = userId,
                    });
                }
            }
        }
        await this.context.SaveChangesAsync();
    }

    public async Task RemoveLevelTags(int[] tagIds)
    {
        foreach (var tagId in tagIds)
        {
            var levelTag = await this.context.LevelTagRelations.Where(tag => tag.Id == tagId).FirstOrDefaultAsync();
            if (levelTag != null)
            {
                this.context.LevelTagRelations.Remove(levelTag);
            }
        }
        await this.context.SaveChangesAsync();
    }

    public async Task RemoveLevelTagsByLevelAndTagIds(int levelId, int[] tagIds)
    {
        if (tagIds == null || tagIds.Length == 0)
        {
            return;
        }

        var relations = await this.context.LevelTagRelations
            .Where(r => r.LevelId == levelId && tagIds.Contains(r.TagId))
            .ToListAsync();

        if (relations.Count == 0)
        {
            return;
        }

        this.context.LevelTagRelations.RemoveRange(relations);
        await this.context.SaveChangesAsync();
    }

    public async Task RemoveLevelFavorite(int[] requestLevelFavoriteIds)
    {
        foreach (var favoriteId in requestLevelFavoriteIds)
        {
            var levelFavorite = await this.context.LevelFavorites.Where(favorite => favorite.Id == favoriteId).FirstOrDefaultAsync();
            if (levelFavorite != null)
            {
                this.context.LevelFavorites.Remove(levelFavorite);
            }
        }
        await this.context.SaveChangesAsync();
    }

    public async Task<LevelFavoriteEntity?> GetLevelFavorite(int favoriteId)
    {
        return await this.context.LevelFavorites
            .Where(favorite => favorite.Id == favoriteId)
            .Include(favorite => favorite.User)
            .Include(favorite => favorite.Level)
            .FirstOrDefaultAsync();
    }

    public async Task UpdateFavoriteLevel(LevelFavoriteEntity favorite)
    {
        this.context.Entry(favorite).State = EntityState.Modified;
        await this.context.SaveChangesAsync();
    }

    public async Task RemoveLevelCompleted(int[] requestLevelCompletedIds)
    {
        foreach (var levelCompletedId in requestLevelCompletedIds)
        {
            var levelCompleted = await this.context.LevelCompleted.Where(completed => completed.Id == levelCompletedId).FirstOrDefaultAsync();
            if (levelCompleted != null)
            {
                this.context.LevelCompleted.Remove(levelCompleted);
            }
        }
        await this.context.SaveChangesAsync();
    }

    public async Task UpdateCompletedLevel(LevelCompletedEntity levelCompletedEntity)
    {
        this.context.Entry(levelCompletedEntity).State = EntityState.Modified;
        await this.context.SaveChangesAsync();
    }

    public Task CreateLevelFavorite(int[] levelIds, int requestUserId)
    {
        return this.CreateLevelFavoriteInternal(levelIds, requestUserId);
    }

    private async Task CreateLevelFavoriteInternal(int[] levelIds, int requestUserId)
    {
        foreach (var levelId in levelIds)
        {
            var exists = await this.context.LevelFavorites
                .Where(favorite => favorite.LevelId == levelId && favorite.UserId == requestUserId)
                .FirstOrDefaultAsync();

            if (exists != null)
            {
                continue;
            }

            await this.context.LevelFavorites.AddAsync(new LevelFavoriteEntity
            {
                LevelId = levelId,
                UserId = requestUserId,
                Description = "",
            });
        }

        await this.context.SaveChangesAsync();
    }
}