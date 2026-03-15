namespace Mouse.NET.LevelComments.Models;

public class LevelCommentCollectRequest
{
    public int? levelId { get; set; }
    
    public int? userId { get; set; }
}

public class LevelCommentCollectPagedRequest : Mouse.NET.Common.PaginateRequest
{
    public string? Query { get; set; }

    public int? LevelId { get; set; }

    public int? UserId { get; set; }
}