using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Common;
using Mouse.NET.LevelComments.Models;
using Mouse.NET.Levels.dto;
using Mouse.NET.Levels.Models;
using Mouse.NET.Levels.services;

namespace Mouse.NET.Levels;

[ApiController]
[Route("levels")]
public class LevelController : ControllerBase
{
    
    private readonly ILevelService levelService;

    public LevelController(ILevelService levelService)
    {
        this.levelService = levelService;
    }

    [HttpGet("collect")]
    public async Task<PagedResult<Level>> GetLevelCollection([FromQuery] LevelCollectionGetRequest getRequest)
    {
        return await this.levelService.GetLevelCollection(getRequest);
    }

    [HttpGet("by-id/{levelId}")]
    public async Task<Level> GetLevel([FromRoute] int levelId)
    {
        return await this.levelService.GetLevel(levelId);
    }
    
    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<Level> UpdateLevel([FromBody] LevelUpdateRequest updateRequest)
    {
        return await this.levelService.UpdateLevel(updateRequest);
    }
    
    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<Level> CreateLevel([FromBody] LevelCreateRequest createRequest)
    {
        return await this.levelService.CreateLevel(createRequest);
    }
    
    [HttpPost("{levelId}/update-image")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> UpdateLevelImage([FromRoute] int levelId, IFormFile formFile)
    {
        await this.levelService.UpdateLevelImage(levelId, formFile);
        return "Ok";
    }
    
    [HttpPost("update-completed-image/{completedId}")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> UpdateLevelCompletedImage([FromRoute] int completedId, IFormFile formFile)
    {
        await this.levelService.UpdateLevelCompletedImage(completedId, formFile);
        return "Ok";
    }
    
    [HttpDelete("remove/{levelId}")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> DeleteLevel([FromRoute] int levelId)
    {
        return await this.levelService.DeleteLevel(levelId);
    }
    
    [HttpPost("{levelId}/completed/complete")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<LevelCompleted> CompleteLevel([FromRoute] int levelId, IFormFile formFile)
    {
        return await this.levelService.CompleteLevel(levelId, formFile, "");
    }
    
    [HttpDelete("{levelId}/completed/{completedId}/remove")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> UnCompleteLevel([FromRoute] int completedId)
    {
        await this.levelService.UnCompleteLevel(completedId);
        return "Ok";
    }
    
    [HttpPost("completed/create")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<LevelCompleted> CreateCompletedLevel([FromBody] CreateLevelCompletedRequest request)
    {
        return await this.levelService.CreateLevelCompleted(request);
    }
    
    [HttpDelete("completed/remove")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> RemoveCompletedLevel([FromQuery] RemoveLevelCompletedRequest request)
    {
        await this.levelService.RemoveLevelCompleted(request);
        return "Ok";
    }
    
    [HttpDelete("favorite/remove")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> RemoveLevelFavorite([FromQuery] RemoveLevelFavoriteRequest request)
    {
        await this.levelService.RemoveLevelFavorite(request);
        return "Ok";
    }
    
    [HttpGet("favorite/collect")]
    [Authorize(Policy = "AnyAuthenticated")]
    public async Task<List<LevelFavorite>> GetLevelFavoriteCollection([FromQuery] FavoriteCollectRequest request)
    {
        return await this.levelService.GetLevelFavoriteCollection(request);
    }
    
    [HttpGet("completed/collect")]
    [Authorize(Policy = "AnyAuthenticated")]
    public async Task<List<LevelCompleted>> GetLevelCompletedCollection([FromQuery] CompletedCollectRequest request)
    {
        return await this.levelService.GetLevelCompletedCollection(request);
    }
    
    [HttpPut("completed/update")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<LevelCompleted> UpdateLevelCompleted([FromBody] UpdateLevelCompletedRequest request)
    {
        return await this.levelService.UpdateLevelCompleted(request);
    }
    
    [HttpPost("completed/update-image")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> UpdateCompletedImage([FromQuery] int completedId, IFormFile formFile)
    {
        await this.levelService.UpdateLevelCompletedImage(completedId, formFile);
        return "Ok";
    }
    
    [HttpPost("tags/create")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> CreateLevelTag([FromBody] CreateLevelTagRequest request)
    {
        await this.levelService.CreateLevelTag(request);
        return "Ok";
    }
    
    [HttpDelete("tags/remove")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> RemoveLevelTag([FromQuery] RemoveLevelTagRequest request)
    {
        await this.levelService.RemoveLevelTag(request);
        return "Ok";
    }
    
    [HttpPost("{levelId}/favorites/favorite")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> FavoriteLevel([FromRoute] int levelId)
    {
        await this.levelService.FavoriteLevel(levelId);
        return "Ok";
    }
    
    [HttpDelete("{levelId}/favorites/delete")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> UnFavoriteLevel([FromRoute] int levelId)
    {
        await this.levelService.UnFavoriteLevel(levelId);
        return "Ok";
    }
    
    [HttpPut("set-tags")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<Level> SetLevelTags([FromBody] LevelTagsSetRequest request)
    {
        return await this.levelService.SetLevelTags(request);
    }
    
    [HttpPut("set-note")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<Level> SetLevelNote([FromBody] LevelNoteSetRequest request)
    {
        return await this.levelService.SetLevelNote(request);
    }

    [HttpGet("notes/collect")]
    [Authorize(Policy = nameof(Policy.LevelsRead))]
    public async Task<List<LevelNote>> CollectNotes([FromQuery] LevelNoteCollectRequest request)
    {
        return await this.levelService.CollectLevelNotes(request);
    }

    [HttpPost("notes/create")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<LevelNote> CreateNote([FromBody] CreateLevelNoteRequest request)
    {
        return await this.levelService.CreateLevelNote(request);
    }

    [HttpPut("notes/update")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<LevelNote> UpdateNote([FromBody] UpdateLevelNoteRequest request)
    {
        return await this.levelService.UpdateLevelNote(request);
    }

    [HttpDelete("notes/remove")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> RemoveNotes([FromQuery] RemoveLevelNotesRequest request)
    {
        await this.levelService.RemoveLevelNotes(request);
        return "Ok";
    }
    
    [HttpPost("favorite/create")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<string> CreateLevelFavorite([FromBody] CreateLevelFavoriteRequest request)
    {
        await this.levelService.CreateLevelFavorite(request);
        return "Ok";
    }

    [HttpPut("favorite/update")]
    [Authorize(Policy = nameof(Policy.LevelsWrite))]
    public async Task<LevelFavorite> UpdateLevelFavorite([FromBody] UpdateLevelFavoriteRequest request)
    {
        return await this.levelService.UpdateLevelFavorite(request);
    }
}