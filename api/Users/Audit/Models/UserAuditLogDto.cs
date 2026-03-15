namespace Mouse.NET.Users.Audit.Models;

public class UserAuditLogDto
{
    public long Id { get; set; }

    public int? ActorUserId { get; set; }

    public string? ActorUserName { get; set; }

    public int? TargetUserId { get; set; }

    public string? TargetUserName { get; set; }

    public string Action { get; set; }

    public string? EntityType { get; set; }

    public string? EntityId { get; set; }

    public string? Ip { get; set; }

    public string? UserAgent { get; set; }

    public string? MetadataJson { get; set; }

    public DateTime? CreatedUtcDate { get; set; }
}
