using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mouse.NET.Data.Models;

[Table("user_sessions")]
public class UserSessionEntity : AuditableEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Column("user_id")]
    public int? UserId { get; set; }

    public UserEntity? User { get; set; }

    [Column("ip")]
    public string? Ip { get; set; }

    [Column("user_agent")]
    public string? UserAgent { get; set; }

    [Column("device")]
    public string? Device { get; set; }

    [Column("success")]
    public bool Success { get; set; }

    [Column("failure_reason")]
    public string? FailureReason { get; set; }
}
