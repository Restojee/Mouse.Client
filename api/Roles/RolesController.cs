using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Roles.Models;
using Mouse.NET.Roles.services;

namespace Mouse.NET.Roles;

[ApiController]
[Route("roles")]
public class RolesController : ControllerBase
{
    private readonly IRoleService roleService;

    public RolesController(IRoleService roleService)
    {
        this.roleService = roleService;
    }

    [HttpGet("collect")]
    [Authorize(Policy = nameof(Policy.RolesRead))]
    public async Task<ICollection<RoleCard>> GetRoles()
    {
        return await this.roleService.GetRoleCollection();
    }

    [HttpGet("{roleId}")]
    [Authorize(Policy = nameof(Policy.RolesRead))]
    public async Task<RoleDetails> GetRole([FromRoute] int roleId)
    {
        return await this.roleService.GetRole(roleId);
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.RolesCreate))]
    public async Task<RoleCard> CreateRole([FromBody] RoleCreateRequest request)
    {
        return await this.roleService.CreateRole(request);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.RolesUpdate))]
    public async Task<RoleCard> UpdateRole([FromBody] RoleUpdateRequest request)
    {
        return await this.roleService.UpdateRole(request);
    }

    [HttpDelete("{roleId}")]
    [Authorize(Policy = nameof(Policy.RolesDelete))]
    public async Task<string> DeleteRole([FromRoute] int roleId)
    {
        return await this.roleService.DeleteRole(roleId);
    }

    [HttpPut("permissions/set")]
    [Authorize(Policy = nameof(OtherPolicy.Settings))]
    public async Task<string> SetRolePermissions([FromBody] RolePermissionsSetRequest request)
    {
        return await this.roleService.SetRolePermissions(request);
    }

    [HttpPost("assign-to-user")]
    [Authorize(Policy = nameof(Policy.RolesAll))]
    public async Task<string> AssignRoleToUser([FromBody] Mouse.NET.Roles.Models.AssignRoleToUserRequest request)
    {
        return await this.roleService.AssignRoleToUser(request);
    }
}
