using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.Users.Sessions.Models;

namespace Mouse.NET.Users.Sessions.Data;

public interface IUserSessionRepository
{
    Task Add(UserSessionEntity entity);

    Task<PagedResult<UserSessionEntity>> Collect(UserSessionCollectRequest request);
}
