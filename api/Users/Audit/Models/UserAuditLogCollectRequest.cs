using Mouse.NET.Common;

namespace Mouse.NET.Users.Audit.Models;

public class UserAuditLogCollectRequest : PaginateRequest
{
    public int? ActorUserId { get; set; }

    public int? TargetUserId { get; set; }

    public string? Action { get; set; }

    public string? Query { get; set; }
}
