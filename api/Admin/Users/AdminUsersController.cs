using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Auth.Models;
using Mouse.NET.Users.Models;
using Mouse.NET.Users.services;
using Mouse.NET.Users.Audit.Models;
using Mouse.NET.Users.Audit.Services;
using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.Admin.Users;

[ApiController]
[Route("admin/users")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminUsersController : ControllerBase
{
    private readonly IUserService userService;
    private readonly IAuthService authService;
    private readonly IAuditLogWriter auditLogWriter;

    public AdminUsersController(IUserService userService, IAuthService authService, IAuditLogWriter auditLogWriter)
    {
        this.userService = userService;
        this.authService = authService;
        this.auditLogWriter = auditLogWriter;
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.UsersCreate))]
    public async Task<User> Create([FromBody] UserCreateRequest createRequest)
    {
        var account = await this.authService.RegisterAccount(new RegisterAccountRequest()
        {
            UserName = createRequest.UserName,
            Password = createRequest.Password,
            InviteToken = null
        }, false);

        await this.auditLogWriter.TryWrite(new AuditLogEvent
        {
            ActorUserId = this.authService.GetAuthorizedUserId(),
            TargetUserId = account.User.Id,
            Action = "admin.user.create",
            EntityType = "user",
            EntityId = account.User.Id.ToString(),
            MetadataJson = $"{{\"userName\":\"{createRequest.UserName}\"}}",
        });
        return account.User;
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.UsersEdit))]
    public async Task<User> Update([FromBody] UserUpdateRequest updateRequest)
    {
        return await this.userService.UpdateUser(updateRequest);
    }

    [HttpDelete("{userId}")]
    [Authorize(Policy = nameof(Policy.UsersDelete))]
    public async Task<string> Delete([FromRoute] int userId)
    {
        return await this.userService.DeleteUser(userId);
    }
}
