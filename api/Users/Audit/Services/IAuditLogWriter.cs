using Mouse.NET.Users.Audit.Models;

namespace Mouse.NET.Users.Audit.Services;

public interface IAuditLogWriter
{
    Task TryWrite(AuditLogEvent evt);

    Task TryWrite(
        int? actorUserId,
        string action,
        int? targetUserId = null,
        string? entityType = null,
        string? entityId = null,
        string? metadataJson = null);
}
