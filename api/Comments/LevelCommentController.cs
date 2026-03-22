using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.LevelComments.Models;
using Mouse.NET.LevelComments.services;

namespace Mouse.NET.LevelComments;

[ApiController]
[Route("comments")]
public class LevelCommentController : ControllerBase
{
    
    private readonly ILevelCommentService levelCommentService;

    public LevelCommentController(ILevelCommentService levelCommentService)
    {
        this.levelCommentService = levelCommentService;
    }

    [HttpGet("collect")]
    public async Task<ICollection<LevelComment>> GetLevelCommentCollection([FromQuery] LevelCommentCollectRequest request)
    {
        return await this.levelCommentService.GetLevelCommentCollection(request.levelId, request.userId);
    }

    [HttpGet("collect-paged")]
    public async Task<PagedResult<LevelCommentRow>> CollectPaged([FromQuery] Mouse.NET.LevelComments.Models.LevelCommentCollectPagedRequest request)
    {
        return await this.levelCommentService.CollectPaged(request);
    }

    [HttpGet("by-one/{levelCommentId}")]
    public async Task<LevelComment> GetLevelComment([FromRoute] int levelCommentId)
    {
        return await this.levelCommentService.GetLevelComment(levelCommentId);
    }
    
    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.CommentsEditSelf))]
    [Authorize(Policy = nameof(Policy.CommentsEdit))]
    public async Task<LevelComment> UpdateLevelComment([FromBody] LevelCommentUpdateRequest updateRequest)
    {
        return await this.levelCommentService.UpdateLevelComment(updateRequest);
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.CommentsCreate))]
    [Authorize(Policy = nameof(Policy.CommentsCreateSelf))]
    public async Task<LevelComment> CreateLevelComment([FromBody] LevelCommentCreateRequest createRequest)
    {
        return await this.levelCommentService.CreateLevelComment(createRequest);
    }

    [HttpDelete("remove/{levelCommentId}")]
    [Authorize(Policy = nameof(Policy.CommentsDeleteSelf))]
    [Authorize(Policy = nameof(Policy.CommentsDelete))]
    public async Task<string> DeleteLevelComment([FromRoute] int levelCommentId)
    {
        return await this.levelCommentService.DeleteLevelComment(levelCommentId);
    }
}