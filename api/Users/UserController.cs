using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Auth.Models;
using Mouse.NET.Auth.Services;
using Mouse.NET.Common;
using Mouse.NET.Users.Models;
using Mouse.NET.Users.services;
using Mouse.NET.Users.Audit.Models;
using Mouse.NET.Users.Audit.Services;
using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.Users;

//[Authorize]
[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    
    private readonly IUserService userService;
    private readonly IAuthService authService;
    private readonly IAuditLogWriter auditLogWriter;

    public UserController(IUserService userService, IAuthService authService, IAuditLogWriter auditLogWriter)
    {
        this.userService = userService;
        this.authService = authService;
        this.auditLogWriter = auditLogWriter;
    }

    [HttpGet("collect")]
    public async Task<PagedResult<User>> GetUserCollection([FromQuery] UserCollectionGetRequest getRequest)
    {
        return await this.userService.GetUserCollection(getRequest);
    }

    [HttpGet("by-one/{userId}")]
    public async Task<User> GetUser([FromRoute] int userId)
    {
        return await this.userService.GetUser(userId);
    }
    
    [HttpGet("me")]
    [Authorize(Policy = "AnyAuthenticated")]
    public async Task<User> GetCurrentUser()
    {
        return await this.userService.GetUser(this.authService.GetAuthorizedUserId().GetValueOrDefault());
    }

    [Authorize(Policy = "AnyAuthenticated")]
    [HttpPost("update-my-avatar")]
    public async Task<User> UpdateMyAvatar(IFormFile file)
    {
        return await this.userService.UpdateMyAvatar(file);
    }
}