using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Users.Audit.Models;
using Mouse.NET.Users.Audit.Services;

namespace Mouse.NET.Admin.Users.Audit;

[ApiController]
[Route("admin/user-audit-logs")]
public class AdminUserAuditLogController : ControllerBase
{
    private readonly IUserAuditLogService service;

    public AdminUserAuditLogController(IUserAuditLogService service)
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
