namespace Mouse.NET.Users.Sessions.Models;

public class UserSessionDto
{
    public long Id { get; set; }

    public int? UserId { get; set; }

    public string? UserName { get; set; }

    public string? Ip { get; set; }

    public string? UserAgent { get; set; }

    public string? Device { get; set; }

    public bool Success { get; set; }

    public string? FailureReason { get; set; }

    public DateTime? CreatedUtcDate { get; set; }
}
