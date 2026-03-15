namespace Mouse.NET.Roles.Models;

public class RoleCard
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string? Description { get; set; }

    public int UsersCount { get; set; }

    public int PermissionsCount { get; set; }

    public DateTime? CreatedUtcDate { get; set; }
}
