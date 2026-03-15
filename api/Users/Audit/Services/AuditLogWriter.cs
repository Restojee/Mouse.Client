using Microsoft.Extensions.Logging;
using Mouse.NET.Data.Models;
using Mouse.NET.Users.Audit.Data;
using Mouse.NET.Users.Audit.Models;
using Mouse.NET.Users.Telemetry;

namespace Mouse.NET.Users.Audit.Services;

public class AuditLogWriter : IAuditLogWriter
{
    private readonly IUserAuditLogRepository repository;
    private readonly IRequestContext requestContext;
    private readonly ILogger<AuditLogWriter> logger;

    public AuditLogWriter(
        IUserAuditLogRepository repository,
        IRequestContext requestContext,
        ILogger<AuditLogWriter> logger)
    {
        this.repository = repository;
        this.requestContext = requestContext;
        this.logger = logger;
    }

    public async Task TryWrite(
        AuditLogEvent evt)
    {
        if (evt == null)
        {
            return;
        }

        try
        {
            await this.repository.Add(new UserAuditLogEntity
            {
                ActorUserId = evt.ActorUserId,
                TargetUserId = evt.TargetUserId,
                Action = evt.Action,
                EntityType = evt.EntityType,
                EntityId = evt.EntityId,
                MetadataJson = evt.MetadataJson,
                Ip = this.requestContext.Ip,
                UserAgent = this.requestContext.UserAgent,
            });
        }
        catch (Exception ex)
        {
            this.logger.LogError(ex, "Failed to write user audit log");
        }
    }

    public async Task TryWrite(
        int? actorUserId,
        string action,
        int? targetUserId = null,
        string? entityType = null,
        string? entityId = null,
        string? metadataJson = null)
    {
        await this.TryWrite(new AuditLogEvent
        {
            ActorUserId = actorUserId,
            TargetUserId = targetUserId,
            Action = action,
            EntityType = entityType,
            EntityId = entityId,
            MetadataJson = metadataJson,
        });
    }
}
