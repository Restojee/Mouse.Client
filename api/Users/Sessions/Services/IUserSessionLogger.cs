namespace Mouse.NET.Users.Sessions.Services;

public interface IUserSessionLogger
{
    Task TryLogLogin(int? userId, bool success, string? failureReason = null);
}
