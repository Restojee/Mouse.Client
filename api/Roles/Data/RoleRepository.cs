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
        return await this.context.Roles
            .OrderByDescending(r => r.CreatedUtcDate)
            .ThenBy(r => r.Name)
            .ToListAsync();
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
            .ToHashSet();

        var allRegistryKeys = PolicyRegistry.All
            .SelectMany(d => d.AllKeys())
            .ToHashSet();

        var existing = await this.context.RolePolicyBindings
            .Where(rp => rp.RoleId == roleId && allRegistryKeys.Contains(rp.PolicyKey))
            .ToListAsync();

        var existingKeys = existing.Select(e => e.PolicyKey).ToHashSet();

        var toRemove = existing.Where(e => !desiredKeys.Contains(e.PolicyKey)).ToList();
        if (toRemove.Count > 0)
        {
            this.context.RolePolicyBindings.RemoveRange(toRemove);
        }

        var toAdd = desiredKeys.Where(k => !existingKeys.Contains(k)).ToList();
        foreach (var p in toAdd)
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
