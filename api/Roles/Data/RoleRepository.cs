using Microsoft.EntityFrameworkCore;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.Common;

namespace Mouse.NET.Roles.Data;

public class RoleRepository : IRoleRepository
{
    private readonly MouseDbContext context;

    public RoleRepository(MouseDbContext context)
    {
        this.context = context;
    }

    public async Task<ICollection<RoleEntity>> GetRoleCollection()
    {
        return await this.context.Roles.OrderBy(r => r.Name).ToListAsync();
    }

    public async Task<RoleEntity?> GetRole(int roleId)
    {
        return await this.context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);
    }

    public async Task<RoleEntity?> GetRoleByName(string name)
    {
        return await this.context.Roles.FirstOrDefaultAsync(r => r.Name == name);
    }

    public async Task<int> GetUsersCountByRole(string roleName)
    {
        return await this.context.Users.CountAsync(u => u.Role == roleName);
    }

    public async Task<ICollection<string>> GetRolePolicyKeys(int roleId)
    {
        return await this.context.RolePolicyBindings
            .Where(b => b.RoleId == roleId)
            .Select(b => b.PolicyKey)
            .Distinct()
            .OrderBy(x => x)
            .ToListAsync();
    }

    public async Task<RoleEntity> CreateRole(RoleEntity role)
    {
        await this.context.Roles.AddAsync(role);
        await this.context.SaveChangesAsync();
        return role;
    }

    public async Task<RoleEntity> UpdateRole(RoleEntity role)
    {
        this.context.Entry(role).State = EntityState.Modified;
        await this.context.SaveChangesAsync();
        return role;
    }

    public async Task DeleteRole(RoleEntity role)
    {
        var bindings = await this.context.RolePolicyBindings.Where(rp => rp.RoleId == role.Id).ToListAsync();
        if (bindings.Count > 0)
        {
            this.context.RolePolicyBindings.RemoveRange(bindings);
        }

        this.context.Roles.Remove(role);
        await this.context.SaveChangesAsync();
    }

    public async Task UpdateRolePolicies(int roleId, ICollection<string> policyKeys)
    {
        var knownPolicies = Enum.GetNames<Policy>().ToHashSet();
        var knownOther = Enum.GetNames<OtherPolicy>().ToHashSet();

        var desiredKeys = (policyKeys ?? Array.Empty<string>())
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Select(x => x.Trim())
            .Distinct()
            .ToList();

        var defByAnyKey = PolicyRegistry.All
            .SelectMany(d => d.AllKeys().Select(k => new { k, d }))
            .GroupBy(x => x.k)
            .ToDictionary(g => g.Key, g => g.First().d);

        var scopeKeys = new HashSet<string>();
        foreach (var key in desiredKeys)
        {
            if (defByAnyKey.TryGetValue(key, out var def))
            {
                foreach (var k in def.AllKeys())
                {
                    scopeKeys.Add(k);
                }
            }
        }

        if (scopeKeys.Count == 0)
        {
            foreach (var k in desiredKeys)
            {
                scopeKeys.Add(k);
            }
        }

        var existingInScope = await this.context.RolePolicyBindings
            .Where(rp => rp.RoleId == roleId && scopeKeys.Contains(rp.PolicyKey))
            .ToListAsync();

        if (existingInScope.Count > 0)
        {
            this.context.RolePolicyBindings.RemoveRange(existingInScope);
        }

        foreach (var p in desiredKeys)
        {
            RolePolicyType policyType;
            if (knownPolicies.Contains(p)) policyType = RolePolicyType.Policy;
            else if (knownOther.Contains(p)) policyType = RolePolicyType.OtherPolicy;
            else continue;

            this.context.RolePolicyBindings.Add(new RolePolicyBindingEntity
            {
                RoleId = roleId,
                PolicyType = policyType,
                PolicyKey = p,
            });
        }

        await this.context.SaveChangesAsync();
    }

    public async Task SetRolePolicies(int roleId, ICollection<string> policyKeys)
    {
        var current = await this.context.RolePolicyBindings.Where(rp => rp.RoleId == roleId).ToListAsync();
        if (current.Count > 0)
        {
            this.context.RolePolicyBindings.RemoveRange(current);
        }

        var knownPolicies = Enum.GetNames<Policy>().ToHashSet();
        var knownOther = Enum.GetNames<OtherPolicy>().ToHashSet();

        foreach (var p in policyKeys.Distinct())
        {
            RolePolicyType policyType;
            if (knownPolicies.Contains(p)) policyType = RolePolicyType.Policy;
            else if (knownOther.Contains(p)) policyType = RolePolicyType.OtherPolicy;
            else continue;

            this.context.RolePolicyBindings.Add(new RolePolicyBindingEntity
            {
                RoleId = roleId,
                PolicyType = policyType,
                PolicyKey = p,
            });
        }

        await this.context.SaveChangesAsync();
    }

    public async Task AssignRoleToUser(int userId, string roleName)
    {
        var user = await this.context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (user == null)
        {
            throw new ApiNotFoundException(
                name: "UserNotFound",
                messages: new[] { "User not found" });
        }

        user.Role = roleName;
        await this.context.SaveChangesAsync();
    }
}
