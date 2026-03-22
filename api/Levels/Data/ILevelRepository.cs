using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelComments.Models;
using Mouse.NET.Levels.Models;

namespace Mouse.NET.Levels.Data
{
    public interface ILevelRepository
    {
        public Task<PagedResult<LevelEntity>> GetLevelCollection(LevelCollectionGetRequest request);

        public Task<PagedResult<LevelFavoriteEntity>> GetLevelFavoriteCollection(FavoriteCollectRequest request);
        
        public Task<PagedResult<LevelCompletedEntity>> GetLevelCompletedCollection(CompletedCollectRequest request);
        
        public Task<LevelEntity?> GetLevel(int levelId, int? userId = null);
        
        public Task<LevelEntity> CreateLevel(LevelEntity level);
        
        public Task<LevelEntity> UpdateLevel(LevelEntity level);
        
        public Task DeleteLevel(LevelEntity level);

        public Task<LevelEntity> SetLevelTags(LevelEntity level, ICollection<int> tagIds);

        public Task<LevelCompletedEntity> CompleteLevel(LevelCompletedEntity completed);

        public Task UnCompleteLevel(LevelCompletedEntity completed);

        public Task FavoriteLevel(LevelFavoriteEntity favorite);

        public Task UnFavoriteLevel(LevelFavoriteEntity favorite);

        public Task<LevelFavoriteEntity?> GetFavoriteLevel(int levelId, int userId);

        public Task<LevelCompletedEntity?> GetCompletedLevel(int completedId, int userId);
        
        public Task<LevelCompletedEntity?> GetCompletedLevel(int completedId);

        public Task<LevelNoteEntity?> GetLevelNote(int levelId, int userId);

        public Task<LevelNoteEntity?> GetLevelNoteById(int noteId);

        public Task<List<LevelNoteEntity>> CollectLevelNotes(int? userId, int? levelId);

        public Task CreateLevelVisit(LevelVisitEntity visit);

        public Task UpdateLevelNote(LevelNoteEntity note);

        public Task CreateLevelNote(LevelNoteEntity note);

        public Task RemoveLevelNotes(int[] noteIds);
        
        public Task CreateLevelTags(int[] levelIds, int[] requestTagIds, int? userId);
        
        public Task RemoveLevelTags(int[] tagIds);

        public Task RemoveLevelTagsByLevelAndTagIds(int levelId, int[] tagIds);
        
        public Task CreateLevelFavorite(int[] levelIds, int requestUserId);
        
        public Task RemoveLevelFavorite(int[] levelFavoriteIds);

        public Task<LevelFavoriteEntity?> GetLevelFavorite(int favoriteId);

        public Task UpdateFavoriteLevel(LevelFavoriteEntity favorite);
        
        public Task RemoveLevelCompleted(int[] levelCompletedIds);
        public Task UpdateCompletedLevel(LevelCompletedEntity levelCompletedEntity);
    }
}