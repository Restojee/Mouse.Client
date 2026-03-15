namespace Mouse.NET.Users.Telemetry;

public interface IRequestContext
{
    string? Ip { get; }

    string? UserAgent { get; }

    string? Device { get; }
}
