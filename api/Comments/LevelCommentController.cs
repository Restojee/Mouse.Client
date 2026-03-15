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
    [Authorize(Policy = nameof(Policy.CommentsRead))]
    public async Task<ICollection<LevelComment>> GetLevelCommentCollection([FromQuery] LevelCommentCollectRequest request)
    {
        return await this.levelCommentService.GetLevelCommentCollection(request.levelId, request.userId);
    }

    [HttpGet("collect-paged")]
    [Authorize(Policy = nameof(Policy.CommentsRead))]
    public async Task<PagedResult<LevelCommentRow>> CollectPaged([FromQuery] Mouse.NET.LevelComments.Models.LevelCommentCollectPagedRequest request)
    {
        return await this.levelCommentService.CollectPaged(request);
    }

    [HttpGet("by-one/{levelCommentId}")]
    [Authorize(Policy = nameof(Policy.CommentsRead))]
    public async Task<LevelComment> GetLevelComment([FromRoute] int levelCommentId)
    {
        return await this.levelCommentService.GetLevelComment(levelCommentId);
    }
    
    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.CommentsWrite))]
    public async Task<LevelComment> UpdateLevelComment([FromBody] LevelCommentUpdateRequest updateRequest)
    {
        return await this.levelCommentService.UpdateLevelComment(updateRequest);
    }

    [HttpPut("update-admin")]
    [Authorize(Policy = nameof(Policy.CommentsWrite))]
    public async Task<LevelCommentRow> UpdateAdmin([FromBody] LevelCommentAdminUpdateRequest updateRequest)
    {
        return await this.levelCommentService.UpdateAdmin(updateRequest);
    }
    
    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.CommentsWrite))]
    public async Task<LevelComment> CreateLevelComment([FromBody] LevelCommentCreateRequest createRequest)
    {
        return await this.levelCommentService.CreateLevelComment(createRequest);
    }

    [HttpPost("create-admin")]
    [Authorize(Policy = nameof(Policy.CommentsWrite))]
    public async Task<LevelCommentRow> CreateAdmin([FromBody] LevelCommentAdminCreateRequest createRequest)
    {
        return await this.levelCommentService.CreateAdmin(createRequest);
    }

    [HttpPost("delete-bulk")]
    [Authorize(Policy = nameof(Policy.CommentsWrite))]
    public async Task<string> DeleteBulk([FromBody] LevelCommentBulkDeleteRequest request)
    {
        await this.levelCommentService.DeleteBulk(request);
        return "Ok";
    }
    
    [HttpDelete("remove/{levelCommentId}")]
    [Authorize(Policy = nameof(Policy.CommentsWrite))]
    public async Task<string> DeleteLevelComments([FromRoute] int levelCommentId)
    {
        return await this.levelCommentService.DeleteLevelComment(levelCommentId);
    }
}