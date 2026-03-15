using Microsoft.Extensions.Logging;
using Mouse.NET.Data.Models;
using Mouse.NET.Users.Sessions.Data;
using Mouse.NET.Users.Telemetry;

namespace Mouse.NET.Users.Sessions.Services;

public class UserSessionLogger : IUserSessionLogger
{
    private readonly IUserSessionRepository repository;
    private readonly IRequestContext requestContext;
    private readonly ILogger<UserSessionLogger> logger;

    public UserSessionLogger(
        IUserSessionRepository repository,
        IRequestContext requestContext,
        ILogger<UserSessionLogger> logger)
    {
        this.repository = repository;
        this.requestContext = requestContext;
        this.logger = logger;
    }

    public async Task TryLogLogin(int? userId, bool success, string? failureReason = null)
    {
        await this.repository.Add(new UserSessionEntity
        {
            UserId = userId,
            Ip = this.requestContext.Ip,
            UserAgent = this.requestContext.UserAgent,
            Device = this.requestContext.Device,
            Success = success,
            FailureReason = failureReason,
        });
    }
}
