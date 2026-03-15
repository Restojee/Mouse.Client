namespace Mouse.NET.Levels.Models;

public class UpdateLevelCompletedRequest
{
    public int CompletedId { get; set; }
    
    public string? Description { get; set; }

    public int? UserId { get; set; }

    public int? LevelId { get; set; }
}
