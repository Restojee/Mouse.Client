namespace Mouse.NET.Roles.Models;

public class RoleDetails
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string? Description { get; set; }

    public int UsersCount { get; set; }

    public DateTime? CreatedUtcDate { get; set; }

    public ICollection<RolePolicyInfo> Policies { get; set; } = Array.Empty<RolePolicyInfo>();
}
