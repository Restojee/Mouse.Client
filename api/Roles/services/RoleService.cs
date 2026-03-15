using AutoMapper;
using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.Roles.Data;
using Mouse.NET.Roles.Models;
using Mouse.NET.Users.Common;

namespace Mouse.NET.Roles.services;

public class RoleService : IRoleService
{
    private readonly IMapper mapper;
    private readonly IRoleRepository roleRepository;

    public RoleService(IMapper mapper, IRoleRepository roleRepository)
    {
        this.mapper = mapper;
        this.roleRepository = roleRepository;
    }

    private static ICollection<RolePolicyInfo> BuildPolicies(ICollection<string> grantedKeys)
    {
        var granted = new HashSet<string>(grantedKeys);

        return PolicyRegistry.All.Select(def =>
        {
            var create = def.CreateKey != null && granted.Contains(def.CreateKey);
            var read = def.ReadKey != null && granted.Contains(def.ReadKey);
            var update = def.UpdateKey != null && granted.Contains(def.UpdateKey);
            var delete = def.DeleteKey != null && granted.Contains(def.DeleteKey);

            var hasCrud = def.CreateKey != null || def.ReadKey != null
                || def.UpdateKey != null || def.DeleteKey != null;

            var otherGranted = def.OtherKeys.Length > 0
                && def.OtherKeys.All(k => granted.Contains(k));

            var all = hasCrud
                ? (def.CreateKey == null || create)
                    && (def.ReadKey == null || read)
                    && (def.UpdateKey == null || update)
                    && (def.DeleteKey == null || delete)
                : otherGranted;

            return new RolePolicyInfo
            {
                Key = def.Key,
                Name = def.Name,
                IsCrud = def.IsCrud,
                Create = create,
                Read = read,
                Update = update,
                Delete = delete,
                All = all,
            };
        }).ToList();
    }

    private static ICollection<string> PoliciesToKeys(ICollection<RolePolicyInfo> policies)
    {
        var keys = new List<string>();
        var defMap = PolicyRegistry.All.ToDictionary(d => d.Key);

        foreach (var policy in policies)
        {
            if (!defMap.TryGetValue(policy.Key, out var def)) continue;

            if (policy.Create && def.CreateKey != null) keys.Add(def.CreateKey);
            if (policy.Read && def.ReadKey != null) keys.Add(def.ReadKey);
            if (policy.Update && def.UpdateKey != null) keys.Add(def.UpdateKey);
            if (policy.Delete && def.DeleteKey != null) keys.Add(def.DeleteKey);

            if (policy.All && def.OtherKeys.Length > 0)
            {
                keys.AddRange(def.OtherKeys);
            }
        }

        return keys.Distinct().ToList();
    }

    public async Task<ICollection<RoleCard>> GetRoleCollection()
    {
        var roles = (await this.roleRepository.GetRoleCollection())
            .Where(r => !r.IsSystem)
            .ToList();

        var result = new List<RoleCard>();
        foreach (var r in roles)
        {
            var usersCount = await this.roleRepository.GetUsersCountByRole(r.Name);
            var policyKeys = await this.roleRepository.GetRolePolicyKeys(r.Id);
            var card = this.mapper.Map<RoleEntity, RoleCard>(r);
            card.UsersCount = usersCount;
            card.PermissionsCount = policyKeys.Count;
            result.Add(card);
        }

        return result.OrderByDescending(x => x.UsersCount).ToList();
    }

    public async Task<RoleDetails> GetRole(int roleId)
    {
        var role = await this.roleRepository.GetRole(roleId);
        if (role == null)
        {
            throw new ApiNotFoundException(
                name: "RoleNotFound",
                messages: new[] { "Role not found" });
        }

        if (role.IsSystem)
        {
            throw new ApiNotFoundException(
                name: "RoleNotFound",
                messages: new[] { "Role not found" });
        }

        var usersCount = await this.roleRepository.GetUsersCountByRole(role.Name);
        var grantedKeys = await this.roleRepository.GetRolePolicyKeys(roleId);

        var details = this.mapper.Map<RoleEntity, RoleDetails>(role);
        details.UsersCount = usersCount;
        details.Policies = BuildPolicies(grantedKeys);

        return details;
    }

    public async Task<RoleCard> CreateRole(RoleCreateRequest request)
    {
        var exists = await this.roleRepository.GetRoleByName(request.Name);
        if (exists != null)
        {
            throw new ApiConflictException(
                name: "RoleAlreadyExists",
                messages: new[] { "Role already exists" });
        }

        var role = new RoleEntity
        {
            Name = request.Name,
            Description = request.Description,
            IsSystem = false,
            CreatedUtcDate = DateTime.UtcNow,
        };

        await this.roleRepository.CreateRole(role);

        var card = this.mapper.Map<RoleEntity, RoleCard>(role);
        card.UsersCount = 0;
        card.PermissionsCount = 0;
        return card;
    }

    public async Task<RoleCard> UpdateRole(RoleUpdateRequest request)
    {
        var role = await this.roleRepository.GetRole(request.Id);
        if (role == null)
        {
            throw new ApiNotFoundException(
                name: "RoleNotFound",
                messages: new[] { "Role not found" });
        }

        role.Name = request.Name;
        role.Description = request.Description;

        await this.roleRepository.UpdateRole(role);

        var card = this.mapper.Map<RoleEntity, RoleCard>(role);
        card.UsersCount = await this.roleRepository.GetUsersCountByRole(role.Name);
        var policyKeys = await this.roleRepository.GetRolePolicyKeys(role.Id);
        card.PermissionsCount = policyKeys.Count;
        return card;
    }

    public async Task<string> DeleteRole(int roleId)
    {
        var role = await this.roleRepository.GetRole(roleId);
        if (role == null)
        {
            throw new ApiNotFoundException(
                name: "RoleNotFound",
                messages: new[] { "Role not found" });
        }

        var anyUsers = await this.roleRepository.GetUsersCountByRole(role.Name);
        if (anyUsers > 0)
        {
            throw new ApiConflictException(
                name: "RoleInUse",
                messages: new[] { "Cannot delete role assigned to users" });
        }

        await this.roleRepository.DeleteRole(role);
        return "Ok";
    }

    public async Task<string> SetRolePermissions(RolePermissionsSetRequest request)
    {
        var role = await this.roleRepository.GetRole(request.RoleId);
        if (role == null)
        {
            throw new ApiNotFoundException(
                name: "RoleNotFound",
                messages: new[] { "Role not found" });
        }

        var policyKeys = PoliciesToKeys(request.Policies);
        await this.roleRepository.UpdateRolePolicies(request.RoleId, policyKeys);
        return "Ok";
    }

    public async Task<string> AssignRoleToUser(AssignRoleToUserRequest request)
    {
        if (request.RoleName == RoleNames.SystemAdmin)
        {
            throw new ApiNotFoundException(
                name: "RoleNotFound",
                messages: new[] { "Role not found" });
        }

        var roleExists = await this.roleRepository.GetRoleByName(request.RoleName);
        if (roleExists == null)
        {
            throw new ApiNotFoundException(
                name: "RoleNotFound",
                messages: new[] { "Role not found" });
        }

        await this.roleRepository.AssignRoleToUser(request.UserId, request.RoleName);
        return "Ok";
    }
}
