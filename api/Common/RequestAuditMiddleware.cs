using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Mouse.NET.Auth.Services;
using Mouse.NET.Users.Audit.Services;

namespace Mouse.NET.Common;

public class RequestAuditMiddleware
{
    private readonly RequestDelegate next;

    public RequestAuditMiddleware(RequestDelegate next)
    {
        this.next = next;
    }

    public async Task Invoke(HttpContext context, JwtService jwtService, IAuditLogWriter auditLogWriter)
    {
        await this.next(context);

        if (!HttpMethods.IsGet(context.Request.Method) && !HttpMethods.IsHead(context.Request.Method))
        {
            return;
        }

        var path = context.Request.Path.Value ?? string.Empty;
        if (path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        var actorUserId = jwtService.GetUserId();

        var metadataJson = JsonSerializer.Serialize(new
        {
            method = context.Request.Method,
            path,
            query = context.Request.QueryString.Value,
            statusCode = context.Response.StatusCode,
        });

        await auditLogWriter.TryWrite(
            actorUserId: actorUserId,
            action: "http.read",
            targetUserId: null,
            entityType: "http",
            entityId: path,
            metadataJson: metadataJson);
    }
}
