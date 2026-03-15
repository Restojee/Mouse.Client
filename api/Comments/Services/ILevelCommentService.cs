using Mouse.NET.Common;
using Mouse.NET.LevelComments.Models;

namespace Mouse.NET.LevelComments.services;

public interface ILevelCommentService
{
    public Task<ICollection<LevelComment>> GetLevelCommentCollection(int? levelI, int? userId);

    public Task<PagedResult<LevelCommentRow>> CollectPaged(LevelCommentCollectPagedRequest request);

    public Task<LevelComment> GetLevelComment(int levelCommentId);

    public Task<LevelComment> CreateLevelComment(LevelCommentCreateRequest createRequest);

    public Task<LevelCommentRow> CreateAdmin(LevelCommentAdminCreateRequest request);

    public Task<LevelComment> UpdateLevelComment(LevelCommentUpdateRequest updateRequest);

    public Task<LevelCommentRow> UpdateAdmin(LevelCommentAdminUpdateRequest updateRequest);

    public Task<string> DeleteLevelComment(int levelCommentId);

    public Task DeleteBulk(LevelCommentBulkDeleteRequest request);
}