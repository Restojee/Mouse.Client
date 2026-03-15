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

        return await PaginationExtensions.ToPagedResult(query.OrderByDescending(x => x.CreatedUtcDate), request.Page, request.Size);
    }
}
