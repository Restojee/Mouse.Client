using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Levels.dto;
using Mouse.NET.Levels.Models;
using Mouse.NET.Levels.services;

namespace Mouse.NET.Admin.Levels;

[ApiController]
[Route("admin/levels")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminLevelsController : ControllerBase
{
    private readonly ILevelService levelService;

    public AdminLevelsController(ILevelService levelService)
    {
        this.levelService = levelService;
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.LevelsCreate))]
    public async Task<Level> Create([FromBody] LevelCreateRequest createRequest)
    {
        return await this.levelService.CreateLevel(createRequest);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<Level> Update([FromBody] LevelUpdateRequest updateRequest)
    {
        return await this.levelService.UpdateLevelAdmin(updateRequest);
    }

    [HttpPost("{levelId}/update-image")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<string> UpdateImage([FromRoute] int levelId, IFormFile formFile)
    {
        await this.levelService.UpdateLevelImageAdmin(levelId, formFile);
        return "Ok";
    }

    [HttpDelete("remove/{levelId}")]
    [Authorize(Policy = nameof(Policy.LevelsDelete))]
    public async Task<string> Delete([FromRoute] int levelId)
    {
        return await this.levelService.DeleteLevelAdmin(levelId);
    }

    [HttpPut("set-tags")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<Level> SetTags([FromBody] LevelTagsSetRequest request)
    {
        return await this.levelService.SetLevelTags(request);
    }

    [HttpPost("tags/create")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<string> CreateTag([FromBody] CreateLevelTagRequest request)
    {
        await this.levelService.CreateLevelTag(request);
        return "Ok";
    }

    [HttpDelete("tags/remove")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<string> RemoveTag([FromQuery] RemoveLevelTagRequest request)
    {
        await this.levelService.RemoveLevelTag(request);
        return "Ok";
    }

    [HttpPost("completed/create")]
    [Authorize(Policy = nameof(Policy.LevelsCreate))]
    public async Task<LevelCompleted> CreateCompleted([FromBody] CreateLevelCompletedRequest request)
    {
        return await this.levelService.CreateLevelCompleted(request);
    }

    [HttpPut("completed/update")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<LevelCompleted> UpdateCompleted([FromBody] UpdateLevelCompletedRequest request)
    {
        return await this.levelService.UpdateLevelCompleted(request);
    }

    [HttpPost("completed/update-image")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<string> UpdateCompletedImage([FromQuery] int completedId, IFormFile formFile)
    {
        await this.levelService.UpdateLevelCompletedImage(completedId, formFile);
        return "Ok";
    }

    [HttpDelete("completed/remove")]
    [Authorize(Policy = nameof(Policy.LevelsDelete))]
    public async Task<string> RemoveCompleted([FromQuery] RemoveLevelCompletedRequest request)
    {
        await this.levelService.RemoveLevelCompleted(request);
        return "Ok";
    }

    [HttpPost("favorite/create")]
    [Authorize(Policy = nameof(Policy.LevelsCreate))]
    public async Task<string> CreateFavorite([FromBody] CreateLevelFavoriteRequest request)
    {
        await this.levelService.CreateLevelFavorite(request);
        return "Ok";
    }

    [HttpPut("favorite/update")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<LevelFavorite> UpdateFavorite([FromBody] UpdateLevelFavoriteRequest request)
    {
        return await this.levelService.UpdateLevelFavorite(request);
    }

    [HttpDelete("favorite/remove")]
    [Authorize(Policy = nameof(Policy.LevelsDelete))]
    public async Task<string> RemoveFavorite([FromQuery] RemoveLevelFavoriteRequest request)
    {
        await this.levelService.RemoveLevelFavorite(request);
        return "Ok";
    }

    [HttpPost("notes/create")]
    [Authorize(Policy = nameof(Policy.LevelsCreate))]
    public async Task<LevelNote> CreateNote([FromBody] CreateLevelNoteRequest request)
    {
        return await this.levelService.CreateLevelNote(request);
    }

    [HttpPut("notes/update")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    public async Task<LevelNote> UpdateNote([FromBody] UpdateLevelNoteRequest request)
    {
        return await this.levelService.UpdateLevelNote(request);
    }

    [HttpDelete("notes/remove")]
    [Authorize(Policy = nameof(Policy.LevelsDelete))]
    public async Task<string> RemoveNotes([FromQuery] RemoveLevelNotesRequest request)
    {
        await this.levelService.RemoveLevelNotes(request);
        return "Ok";
    }
}
