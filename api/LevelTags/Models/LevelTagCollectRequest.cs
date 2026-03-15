using Mouse.NET.Common;

namespace Mouse.NET.LevelTags.Models;

public class LevelTagCollectRequest : PaginateRequest
{
    public string? Query { get; set; }

    public int? LevelId { get; set; }

    public int? TagId { get; set; }

    public int? UserId { get; set; }
}
