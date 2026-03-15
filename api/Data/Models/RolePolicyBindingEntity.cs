using System.ComponentModel.DataAnnotations.Schema;

namespace Mouse.NET.Data.Models;

public enum RolePolicyType
{
    Policy = 0,
    SystemPolicy = 1,
    OtherPolicy = 2,
}

[Table("role_policy_bindings")]
public class RolePolicyBindingEntity
{
    [Column("role_id")]
    public int RoleId { get; set; }

    [Column("policy_type")]
    public RolePolicyType PolicyType { get; set; }

    [Column("policy_key")]
    public string PolicyKey { get; set; }

    public RoleEntity Role { get; set; }
}
