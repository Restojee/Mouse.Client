namespace Mouse.NET.Levels.Models;

public class LevelNoteCollectRequest
{
    public int? UserId { get; set; }

    public int? LevelId { get; set; }

    public string? Query { get; set; }

    public string? SortField { get; set; }

    public string? SortDirection { get; set; }
}
