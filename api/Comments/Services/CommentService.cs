using System.Net;
using AutoMapper;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelComments.Data;
using Mouse.NET.LevelComments.Models;
using Mouse.NET.Common;
using Mouse.NET.Common.Services;
using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.LevelComments.services;

public class LevelCommentService : ILevelCommentService
{
    
    private readonly IMapper mapper;
    private readonly IAuthService authService;
    private readonly ILevelCommentRepository levelCommentRepository;
    private readonly IOwnershipService ownershipService;

    public LevelCommentService(IMapper mapper, ILevelCommentRepository levelCommentRepository, IAuthService authService, IOwnershipService ownershipService) {
        this.levelCommentRepository = levelCommentRepository;
        this.mapper = mapper;
        this.authService = authService;
        this.ownershipService = ownershipService;
    }
    
    public async Task<ICollection<LevelComment>> GetLevelCommentCollection(int? levelId, int? userId)
    {
        return mapper.Map<ICollection<LevelCommentEntity>, ICollection<LevelComment>>(await this.levelCommentRepository.GetLevelCommentCollection(levelId, userId));
    }

    public async Task<PagedResult<LevelCommentRow>> CollectPaged(LevelCommentCollectPagedRequest request)
    {
        var paged = await this.levelCommentRepository.GetPagedCollection(request);
        var records = this.mapper.Map<ICollection<LevelCommentRow>>(paged.Records);
        return new PagedResult<LevelCommentRow>(records, paged.Page, paged.PageSize, paged.TotalItems, paged.TotalPages);
    }

    public async Task<LevelComment> GetLevelComment(int levelCommentId)
    {
        return mapper.Map<LevelCommentEntity, LevelComment>(await this.levelCommentRepository.GetLevelComment(levelCommentId));
    }

    public async Task<LevelComment> CreateLevelComment(LevelCommentCreateRequest request)
    {
        var comment = mapper.Map<LevelCommentCreateRequest, LevelCommentEntity>(request);
        comment.UserId = this.authService.GetAuthorizedUserId().GetValueOrDefault();
        return mapper.Map<LevelCommentEntity, LevelComment>(await this.levelCommentRepository.CreateLevelComment(comment));
    }

    public async Task<LevelCommentRow> CreateAdmin(LevelCommentAdminCreateRequest request)
    {
        var userId = request.UserId ?? this.authService.GetAuthorizedUserId().GetValueOrDefault();
        var comment = new LevelCommentEntity
        {
            LevelId = request.LevelId,
            UserId = userId,
            Text = request.Text,
            CreatedUtcDate = DateTime.UtcNow,
        };

        var created = await this.levelCommentRepository.CreateLevelCommentAdmin(comment);
        return this.mapper.Map<LevelCommentRow>(created);
    }

    public async Task<LevelComment> UpdateLevelComment(LevelCommentUpdateRequest request)
    {
        var commentExists = await this.levelCommentRepository.GetLevelComment(request.Id);
        if (commentExists == null)
        {
            throw new ApiNotFoundException(
                name: "CommentNotFound",
                messages: new[] { "Запрашиваемый комментарий не найден" });
        }
        this.ownershipService.EnsureCanEdit(commentExists.UserId, "комментарий", nameof(Policy.CommentsEditSelf));
        return mapper.Map<LevelCommentEntity, LevelComment>(await this.levelCommentRepository.UpdateLevelComment(mapper.Map(request, commentExists)));
    }

    public async Task<LevelCommentRow> UpdateAdmin(LevelCommentAdminUpdateRequest request)
    {
        var updated = await this.levelCommentRepository.UpdateLevelCommentAdmin(request.Id, request.LevelId, request.UserId, request.Text);
        if (updated == null)
        {
            throw new ApiNotFoundException(
                name: "CommentNotFound",
                messages: new[] { "Запрашиваемый комментарий не найден" });
        }

        return this.mapper.Map<LevelCommentRow>(updated);
    }

    public async Task<string> DeleteLevelComment(int levelCommentId)
    {
        var commentExists = await this.levelCommentRepository.GetLevelComment(levelCommentId);
        if (commentExists == null)
        {
            throw new ApiNotFoundException(
                name: "CommentNotFound",
                messages: new[] { "Запрашиваемый комментарий не найден" });
        }
        this.ownershipService.EnsureCanDelete(commentExists.UserId, "комментарий", nameof(Policy.CommentsDeleteSelf));
        await this.levelCommentRepository.DeleteLevelComment(commentExists);
        return "Ok";
    }

    public async Task DeleteBulk(LevelCommentBulkDeleteRequest request)
    {
        if (request.Ids == null || request.Ids.Count == 0)
        {
            return;
        }

        await this.levelCommentRepository.DeleteBulk(request.Ids);
    }
}