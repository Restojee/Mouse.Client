using System.ComponentModel.DataAnnotations.Schema;

namespace Mouse.NET.Data.Models;

[Table("role_permissions")]
public class RolePermissionEntity
{
    [Column("role_id")]
    public int RoleId { get; set; }

    [Column("permission_id")]
    public int PermissionId { get; set; }

    public RoleEntity Role { get; set; }

    public PermissionEntity Permission { get; set; }
}
