namespace Mouse.NET.Levels.Models;

public class LevelNoteCollectRequest
{
    public int? UserId { get; set; }

    public int? LevelId { get; set; }

    public string? Query { get; set; }
}
