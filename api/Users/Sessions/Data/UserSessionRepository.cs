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

        return await PaginationExtensions.ToPagedResult(query.OrderByDescending(x => x.CreatedUtcDate), request.Page, request.Size);
    }
}
