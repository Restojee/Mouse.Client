using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.Users.Audit.Models;

namespace Mouse.NET.Users.Audit.Data;

public interface IUserAuditLogRepository
{
    Task Add(UserAuditLogEntity entity);

    Task<PagedResult<UserAuditLogEntity>> Collect(UserAuditLogCollectRequest request);
}
