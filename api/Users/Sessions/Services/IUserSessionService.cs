using Mouse.NET.Common;
using Mouse.NET.Users.Sessions.Models;

namespace Mouse.NET.Users.Sessions.Services;

public interface IUserSessionService
{
    Task<PagedResult<UserSessionDto>> Collect(UserSessionCollectRequest request);
}
