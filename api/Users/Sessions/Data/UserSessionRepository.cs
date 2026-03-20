using Microsoft.EntityFrameworkCore;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.Users.Sessions.Models;

namespace Mouse.NET.Users.Sessions.Data;

public class UserSessionRepository : IUserSessionRepository
{
    private readonly MouseDbContext db;

    public UserSessionRepository(MouseDbContext db)
    {
        this.db = db;
    }

    public async Task Add(UserSessionEntity entity)
    {
        this.db.UserSessions.Add(entity);
        await this.db.SaveChangesAsync();
    }

    public async Task<PagedResult<UserSessionEntity>> Collect(UserSessionCollectRequest request)
    {
        var query = this.db.UserSessions
            .AsNoTracking()
            .Include(x => x.User)
            .AsQueryable();

        if (request.UserId != null)
        {
            query = query.Where(x => x.UserId == request.UserId);
        }

        if (request.Success != null)
        {
            query = query.Where(x => x.Success == request.Success);
        }

        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            var q = request.Query.Trim().ToLower();
            query = query.Where(x =>
                (x.Ip != null && x.Ip.ToLower().Contains(q)) ||
                (x.UserAgent != null && x.UserAgent.ToLower().Contains(q)) ||
                (x.Device != null && x.Device.ToLower().Contains(q)) ||
                (x.User != null && x.User.UserName != null && x.User.UserName.ToLower().Contains(q))
            );
        }

        query = ApplySorting(query, request);
        return await PaginationExtensions.ToPagedResult(query, request.Page, request.Size);
    }

    private static IQueryable<UserSessionEntity> ApplySorting(IQueryable<UserSessionEntity> query, PaginateRequest request)
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
            "userName" => isDesc ? query.OrderByDescending(x => x.User.UserName) : query.OrderBy(x => x.User.UserName),
            "ip" => isDesc ? query.OrderByDescending(x => x.Ip) : query.OrderBy(x => x.Ip),
            "device" => isDesc ? query.OrderByDescending(x => x.Device) : query.OrderBy(x => x.Device),
            "success" => isDesc ? query.OrderByDescending(x => x.Success) : query.OrderBy(x => x.Success),
            "failureReason" => isDesc ? query.OrderByDescending(x => x.FailureReason) : query.OrderBy(x => x.FailureReason),
            "createdUtcDate" => isDesc ? query.OrderByDescending(x => x.CreatedUtcDate) : query.OrderBy(x => x.CreatedUtcDate),
            "userAgent" => isDesc ? query.OrderByDescending(x => x.UserAgent) : query.OrderBy(x => x.UserAgent),
            _ => query.OrderByDescending(x => x.CreatedUtcDate)
        };
    }
}
