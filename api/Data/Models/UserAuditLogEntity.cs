using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mouse.NET.Data.Models;

[Table("user_audit_logs")]
public class UserAuditLogEntity : AuditableEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Column("actor_user_id")]
    public int? ActorUserId { get; set; }

    public UserEntity? ActorUser { get; set; }

    [Column("target_user_id")]
    public int? TargetUserId { get; set; }

    public UserEntity? TargetUser { get; set; }

    [Column("action")]
    public string Action { get; set; }

    [Column("entity_type")]
    public string? EntityType { get; set; }

    [Column("entity_id")]
    public string? EntityId { get; set; }

    [Column("ip")]
    public string? Ip { get; set; }

    [Column("user_agent")]
    public string? UserAgent { get; set; }

    [Column("metadata_json")]
    public string? MetadataJson { get; set; }
}
