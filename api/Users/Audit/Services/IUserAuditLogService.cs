using Mouse.NET.Common;
using Mouse.NET.Users.Audit.Models;

namespace Mouse.NET.Users.Audit.Services;

public interface IUserAuditLogService
{
    Task<PagedResult<UserAuditLogDto>> Collect(UserAuditLogCollectRequest request);
}
