using AutoMapper;
using Microsoft.AspNetCore.Http;
using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.Roles.Data;
using Mouse.NET.Roles.Models;
using Mouse.NET.Users.Common;
using Mouse.NET.Users.Data;

namespace Mouse.NET.Roles.services;

public class RoleService : IRoleService
{
    private readonly IMapper mapper;
    private readonly IRoleRepository roleRepository;
    private readonly IUserRepository userRepository;
    private readonly IHttpContextAccessor httpContextAccessor;

    private static readonly HashSet<string> SystemPolicyKeys = PolicyRegistry.All
        .Where(d => d.Group == PolicyGroup.System)
        .SelectMany(d => d.AllKeys())
        .ToHashSet(StringComparer.Ordinal);

    public RoleService(IMapper mapper, IRoleRepository roleRepository, IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
    {
        this.mapper = mapper;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.httpContextAccessor = httpContextAccessor;
    }

    private bool HasOtherPolicy(string key)
    {
        return this.httpContextAccessor.HttpContext?.User?.HasClaim("otherPolicy", key) == true;
    }

    private bool HasPolicy(string key)
    {
        return this.httpContextAccessor.HttpContext?.User?.HasClaim("policy", key) == true;
    }

    private static HashSet<string> GetSystemPolicyKeys()
    {
        return SystemPolicyKeys;
    }

    private async Task<bool> RoleHasSystemPolicies(string roleName)
    {
        var role = await this.roleRepository.GetRoleByName(roleName);
        if (role == null) return false;

        var policyKeys = await this.roleRepository.GetRolePolicyKeys(role.Id);
        var systemPolicyKeys = GetSystemPolicyKeys();

        return policyKeys.Any(k => systemPolicyKeys.Contains(k));
    }

    private static ICollection<RolePolicyInfo> BuildPolicies(ICollection<string> grantedKeys)
    {
        var granted = new HashSet<string>(grantedKeys);

        return PolicyRegistry.All.Select(def => new RolePolicyInfo
        {
            Key = def.Key,
            Name = def.Name,
            Label = def.Label,
            Group = def.Group.ToString(),
            Permissions = def.Permissions.Select(p => new RolePolicyPermission
            {
                Key = p.Key,
                Label = p.Label,
                Granted = granted.Contains(p.Key),
            }).ToArray(),
        }).ToList();
    }

    private static ICollection<string> PoliciesToKeys(ICollection<RolePolicyInfo> policies)
    {
        return policies
            .SelectMany(p => p.Permissions.Where(perm => perm.Granted).Select(perm => perm.Key))
            .Distinct()
            .ToList();
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

        if (role.IsSystem)
        {
            throw new ApiForbiddenException(
                name: "RoleIsSystem",
                messages: new[] { "Нет прав на изменение системной роли" });
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

        if (role.IsSystem)
        {
            throw new ApiForbiddenException(
                name: "RoleIsSystem",
                messages: new[] { "Нет прав на удаление системной роли" });
        }

        var grantedKeys = await this.roleRepository.GetRolePolicyKeys(role.Id);
        var systemPolicyKeys = GetSystemPolicyKeys();

        var hasSystemPolicies = grantedKeys.Any(k => systemPolicyKeys.Contains(k));
        if (hasSystemPolicies && !HasOtherPolicy(nameof(OtherPolicy.Settings)))
        {
            throw new ApiForbiddenException(
                name: "NoRights",
                messages: new[] { "Нет прав на удаление роли с системными политиками" });
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

        if (role.IsSystem)
        {
            throw new ApiForbiddenException(
                name: "RoleIsSystem",
                messages: new[] { "Нет прав на изменение прав системной роли" });
        }

        var systemPolicyKeys = GetSystemPolicyKeys();

        var desiredKeys = PoliciesToKeys(request.Policies);

        var currentKeys = await this.roleRepository.GetRolePolicyKeys(request.RoleId);
        var currentSet = new HashSet<string>(currentKeys, StringComparer.Ordinal);
        var desiredSet = new HashSet<string>(desiredKeys, StringComparer.Ordinal);

        var systemKeysChanged = systemPolicyKeys.Any(k => currentSet.Contains(k) != desiredSet.Contains(k));
        if (systemKeysChanged && !HasOtherPolicy(nameof(OtherPolicy.Settings)))
        {
            throw new ApiForbiddenException(
                name: "NoRights",
                messages: new[] { "Нет прав на изменение системных политик" });
        }

        await this.roleRepository.UpdateRolePolicies(request.RoleId, desiredKeys);
        return "Ok";
    }

    public async Task<string> AssignRoleToUser(AssignRoleToUserRequest request)
    {
        var targetUser = await this.userRepository.GetUser(request.UserId);
        if (targetUser == null)
        {
            throw new ApiNotFoundException(
                name: "UserNotFound",
                messages: new[] { "User not found" });
        }

        var roleExists = await this.roleRepository.GetRoleByName(request.RoleName);
        if (roleExists == null)
        {
            throw new ApiNotFoundException(
                name: "RoleNotFound",
                messages: new[] { "Role not found" });
        }

        var currentRoleHasSystem = !string.IsNullOrEmpty(targetUser.Role) && await RoleHasSystemPolicies(targetUser.Role);
        var targetRoleHasSystem = await RoleHasSystemPolicies(request.RoleName);

        if ((currentRoleHasSystem || targetRoleHasSystem) && !HasOtherPolicy(nameof(OtherPolicy.Settings)))
        {
            throw new ApiForbiddenException(
                name: "NoRights",
                messages: new[] { "Нет прав на смену роли с/на системные политики" });
        }

        await this.roleRepository.AssignRoleToUser(request.UserId, request.RoleName);
        return "Ok";
    }
}
