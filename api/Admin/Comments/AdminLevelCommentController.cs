using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.LevelComments.Models;
using Mouse.NET.LevelComments.services;

namespace Mouse.NET.Admin.Comments;

[ApiController]
[Route("admin/comments")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminLevelCommentController : ControllerBase
{
    private readonly ILevelCommentService levelCommentService;

    public AdminLevelCommentController(ILevelCommentService levelCommentService)
    {
        this.levelCommentService = levelCommentService;
    }

    [HttpPost("create-admin")]
    [Authorize(Policy = nameof(Policy.CommentsCreate))]
    public async Task<LevelCommentRow> CreateAdmin([FromBody] LevelCommentAdminCreateRequest createRequest)
    {
        return await this.levelCommentService.CreateAdmin(createRequest);
    }

    [HttpPut("update-admin")]
    [Authorize(Policy = nameof(Policy.CommentsEdit))]
    public async Task<LevelCommentRow> UpdateAdmin([FromBody] LevelCommentAdminUpdateRequest updateRequest)
    {
        return await this.levelCommentService.UpdateAdmin(updateRequest);
    }

    [HttpPost("delete-bulk")]
    [Authorize(Policy = nameof(Policy.CommentsDelete))]
    public async Task<string> DeleteBulk([FromBody] LevelCommentBulkDeleteRequest request)
    {
        await this.levelCommentService.DeleteBulk(request);
        return "Ok";
    }
}
