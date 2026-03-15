using Mouse.NET.Common;

namespace Mouse.NET.Users.Sessions.Models;

public class UserSessionCollectRequest : PaginateRequest
{
    public int? UserId { get; set; }

    public bool? Success { get; set; }

    public string? Query { get; set; }
}
