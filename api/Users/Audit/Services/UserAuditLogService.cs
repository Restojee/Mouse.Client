using Mouse.NET.Common;
using Mouse.NET.Users.Audit.Data;
using Mouse.NET.Users.Audit.Models;

namespace Mouse.NET.Users.Audit.Services;

public class UserAuditLogService : IUserAuditLogService
{
    private readonly IUserAuditLogRepository repository;

    public UserAuditLogService(IUserAuditLogRepository repository)
    {
        this.repository = repository;
    }

    public async Task<PagedResult<UserAuditLogDto>> Collect(UserAuditLogCollectRequest request)
    {
        var paged = await this.repository.Collect(request);
        var records = paged.Records.Select(x => new UserAuditLogDto
        {
            Id = x.Id,
            ActorUserId = x.ActorUserId,
            ActorUserName = x.ActorUser?.UserName,
            TargetUserId = x.TargetUserId,
            TargetUserName = x.TargetUser?.UserName,
            Action = x.Action,
            EntityType = x.EntityType,
            EntityId = x.EntityId,
            Ip = x.Ip,
            UserAgent = x.UserAgent,
            MetadataJson = x.MetadataJson,
            CreatedUtcDate = x.CreatedUtcDate,
        }).ToList();

        return new PagedResult<UserAuditLogDto>(records, paged.Page, paged.PageSize, paged.TotalItems, paged.TotalPages);
    }
}
