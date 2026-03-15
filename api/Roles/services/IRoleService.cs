using Mouse.NET.Roles.Models;

namespace Mouse.NET.Roles.services;

public interface IRoleService
{
    public Task<ICollection<RoleCard>> GetRoleCollection();

    public Task<RoleDetails> GetRole(int roleId);

    public Task<RoleCard> CreateRole(RoleCreateRequest request);

    public Task<RoleCard> UpdateRole(RoleUpdateRequest request);

    public Task<string> DeleteRole(int roleId);

    public Task<string> SetRolePermissions(RolePermissionsSetRequest request);

    public Task<string> AssignRoleToUser(AssignRoleToUserRequest request);
}
