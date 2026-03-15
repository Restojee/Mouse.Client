namespace Mouse.NET.Users.Audit.Models;

public class AuditLogEvent
{
    public int? ActorUserId { get; set; }

    public int? TargetUserId { get; set; }

    public string Action { get; set; }

    public string? EntityType { get; set; }

    public string? EntityId { get; set; }

    public string? MetadataJson { get; set; }
}
