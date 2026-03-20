using Microsoft.EntityFrameworkCore;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.Users.Audit.Models;

namespace Mouse.NET.Users.Audit.Data;

public class UserAuditLogRepository : IUserAuditLogRepository
{
    private readonly MouseDbContext db;

    public UserAuditLogRepository(MouseDbContext db)
    {
        this.db = db;
    }

    public async Task Add(UserAuditLogEntity entity)
    {
        this.db.UserAuditLogs.Add(entity);
        await this.db.SaveChangesAsync();
    }

    public async Task<PagedResult<UserAuditLogEntity>> Collect(UserAuditLogCollectRequest request)
    {
        var query = this.db.UserAuditLogs
            .AsNoTracking()
            .Include(x => x.ActorUser)
            .Include(x => x.TargetUser)
            .AsQueryable();

        if (request.ActorUserId != null)
        {
            query = query.Where(x => x.ActorUserId == request.ActorUserId);
        }

        if (request.TargetUserId != null)
        {
            query = query.Where(x => x.TargetUserId == request.TargetUserId);
        }

        if (!string.IsNullOrWhiteSpace(request.Action))
        {
            query = query.Where(x => x.Action == request.Action);
        }

        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            var q = request.Query.Trim().ToLower();
            query = query.Where(x =>
                (x.Action != null && x.Action.ToLower().Contains(q)) ||
                (x.EntityType != null && x.EntityType.ToLower().Contains(q)) ||
                (x.EntityId != null && x.EntityId.ToLower().Contains(q)) ||
                (x.Ip != null && x.Ip.ToLower().Contains(q)) ||
                (x.ActorUser != null && x.ActorUser.UserName != null && x.ActorUser.UserName.ToLower().Contains(q)) ||
                (x.TargetUser != null && x.TargetUser.UserName != null && x.TargetUser.UserName.ToLower().Contains(q))
            );
        }

        query = ApplySorting(query, request);
        return await PaginationExtensions.ToPagedResult(query, request.Page, request.Size);
    }

    private static IQueryable<UserAuditLogEntity> ApplySorting(IQueryable<UserAuditLogEntity> query, PaginateRequest request)
    {
        var field = request.SortField;
        var direction = request.SortDirection;

        if (string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(direction))
        {
            return query.OrderByDescending(x => x.CreatedUtcDate);
        }

        var isDesc = string.Equals(direction, "desc", StringComparison.OrdinalIgnoreCase);

        return field switch
        {
            "createdUtcDate" => isDesc ? query.OrderByDescending(x => x.CreatedUtcDate) : query.OrderBy(x => x.CreatedUtcDate),
            "action" => isDesc ? query.OrderByDescending(x => x.Action) : query.OrderBy(x => x.Action),
            "actor" => isDesc ? query.OrderByDescending(x => x.ActorUser.UserName) : query.OrderBy(x => x.ActorUser.UserName),
            "target" => isDesc ? query.OrderByDescending(x => x.TargetUser.UserName) : query.OrderBy(x => x.TargetUser.UserName),
            "ip" => isDesc ? query.OrderByDescending(x => x.Ip) : query.OrderBy(x => x.Ip),
            "metadata" => isDesc ? query.OrderByDescending(x => x.MetadataJson) : query.OrderBy(x => x.MetadataJson),
            "entity" => isDesc ? query.OrderByDescending(x => x.EntityType).ThenByDescending(x => x.EntityId) : query.OrderBy(x => x.EntityType).ThenBy(x => x.EntityId),
            _ => query.OrderByDescending(x => x.CreatedUtcDate)
        };
    }
}
