namespace Mouse.NET.Roles.Models;

public class RolePermissionsSetRequest
{
    public int RoleId { get; set; }

    public ICollection<RolePolicyInfo> Policies { get; set; } = Array.Empty<RolePolicyInfo>();
}
