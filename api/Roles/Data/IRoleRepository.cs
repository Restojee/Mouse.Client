using Mouse.NET.Data.Models;

namespace Mouse.NET.Roles.Data;

public interface IRoleRepository
{
    public Task<ICollection<RoleEntity>> GetRoleCollection();

    public Task<RoleEntity?> GetRole(int roleId);

    public Task<RoleEntity?> GetRoleByName(string name);

    public Task<int> GetUsersCountByRole(string roleName);

    public Task<ICollection<string>> GetRolePolicyKeys(int roleId);

    public Task<RoleEntity> CreateRole(RoleEntity role);

    public Task<RoleEntity> UpdateRole(RoleEntity role);

    public Task DeleteRole(RoleEntity role);

    public Task SetRolePolicies(int roleId, ICollection<string> policyKeys);

    public Task UpdateRolePolicies(int roleId, ICollection<string> policyKeys);

    public Task AssignRoleToUser(int userId, string roleName);
}
