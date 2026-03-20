using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Users.Sessions.Models;
using Mouse.NET.Users.Sessions.Services;

namespace Mouse.NET.Admin.Users.Sessions;

[ApiController]
[Route("admin/user-sessions")]
public class AdminUserSessionController : ControllerBase
{
    private readonly IUserSessionService service;

    public AdminUserSessionController(IUserSessionService service)
    {
        this.service = service;
    }

    [HttpGet("collect")]
    [Authorize(Policy = nameof(OtherPolicy.UserSession))]
    public async Task<PagedResult<UserSessionDto>> Collect([FromQuery] UserSessionCollectRequest request)
    {
        return await this.service.Collect(request);
    }
}
