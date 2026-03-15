using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Users.Audit.Models;
using Mouse.NET.Users.Audit.Services;

namespace Mouse.NET.Users.Audit;

[ApiController]
[Route("user-audit-logs")]
public class UserAuditLogController : ControllerBase
{
    private readonly IUserAuditLogService service;

    public UserAuditLogController(IUserAuditLogService service)
    {
        this.service = service;
    }

    [HttpGet("collect")]
    [Authorize(Policy = nameof(OtherPolicy.UserAuditLog))]
    public async Task<PagedResult<UserAuditLogDto>> Collect([FromQuery] UserAuditLogCollectRequest request)
    {
        return await this.service.Collect(request);
    }
}
