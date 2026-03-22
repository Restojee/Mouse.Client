using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Roles.Models;
using Mouse.NET.Roles.services;

namespace Mouse.NET.Admin.Roles;

[ApiController]
[Route("admin/roles")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminRolesController : ControllerBase
{
    private readonly IRoleService roleService;

    public AdminRolesController(IRoleService roleService)
    {
        this.roleService = roleService;
    }

    [HttpGet("collect")]
    [Authorize(Policy = nameof(Policy.RolesRead))]
    public async Task<ICollection<RoleCard>> Collect()
    {
        return await this.roleService.GetRoleCollection();
    }

    [HttpGet("{roleId}")]
    [Authorize(Policy = nameof(Policy.RolesRead))]
    public async Task<RoleDetails> Get([FromRoute] int roleId)
    {
        return await this.roleService.GetRole(roleId);
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.RolesCreate))]
    public async Task<RoleCard> Create([FromBody] RoleCreateRequest request)
    {
        return await this.roleService.CreateRole(request);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.RolesUpdate))]
    public async Task<RoleCard> Update([FromBody] RoleUpdateRequest request)
    {
        return await this.roleService.UpdateRole(request);
    }

    [HttpDelete("{roleId}")]
    [Authorize(Policy = nameof(Policy.RolesDelete))]
    public async Task<string> Delete([FromRoute] int roleId)
    {
        return await this.roleService.DeleteRole(roleId);
    }

    [HttpPut("permissions/set")]
    [Authorize(Policy = nameof(Policy.RolesUpdate))]
    public async Task<string> SetPermissions([FromBody] RolePermissionsSetRequest request)
    {
        return await this.roleService.SetRolePermissions(request);
    }

    [HttpPost("assign-to-user")]
    [Authorize(Policy = nameof(Policy.UsersEdit))]
    public async Task<string> AssignToUser([FromBody] AssignRoleToUserRequest request)
    {
        return await this.roleService.AssignRoleToUser(request);
    }
}
