using Mouse.NET.Common;
using Mouse.NET.LevelComments.Models;
using Mouse.NET.Levels.dto;
using Mouse.NET.Levels.Models;

namespace Mouse.NET.Levels.services;

public interface ILevelService
{
    public Task<PagedResult<Level>> GetLevelCollection(LevelCollectionGetRequest getRequest);
    
    public Task<List<LevelFavorite>> GetLevelFavoriteCollection(FavoriteCollectRequest getRequest);
    
    public Task<List<LevelCompleted>> GetLevelCompletedCollection(CompletedCollectRequest getRequest);

    public Task<Level> GetLevel(int levelId);

    public Task<Level> CreateLevel(LevelCreateRequest createRequest);

    public Task<Level> UpdateLevel(LevelUpdateRequest updateRequest);

    public Task<string> DeleteLevel(int levelId);

    public Task<Level> SetLevelTags(LevelTagsSetRequest request);

    public Task<Level> SetLevelNote(LevelNoteSetRequest request);

    public Task<List<LevelNote>> CollectLevelNotes(LevelNoteCollectRequest request);

    public Task<LevelNote> CreateLevelNote(CreateLevelNoteRequest request);

    public Task<LevelNote> UpdateLevelNote(UpdateLevelNoteRequest request);

    public Task RemoveLevelNotes(RemoveLevelNotesRequest request);

    public Task<LevelCompleted> CompleteLevel(int levelId, IFormFile file, string? description);

    public Task UnCompleteLevel(int completedId);

    public Task FavoriteLevel(int levelId);

    public Task UnFavoriteLevel(int levelId);
    
    
    public Task UpdateLevelImage(int levelId, IFormFile file);
    
    public Task RemoveLevelCompleted(RemoveLevelCompletedRequest request);
    
    public Task<LevelCompleted> CreateLevelCompleted(CreateLevelCompletedRequest request);
    
    public Task UpdateLevelCompletedImage(int completedId, IFormFile formFile);
    
    public Task<LevelCompleted> UpdateLevelCompleted(UpdateLevelCompletedRequest request);
    
    public Task CreateLevelFavorite(CreateLevelFavoriteRequest request);
    
    public Task RemoveLevelFavorite(RemoveLevelFavoriteRequest request);

    public Task<LevelFavorite> UpdateLevelFavorite(UpdateLevelFavoriteRequest request);
    
    public Task CreateLevelTag(CreateLevelTagRequest request);
    
    public Task RemoveLevelTag(RemoveLevelTagRequest request);

    public Task<Level> UpdateLevelAdmin(LevelUpdateRequest updateRequest);

    public Task<string> DeleteLevelAdmin(int levelId);

    public Task UpdateLevelImageAdmin(int levelId, IFormFile file);
}