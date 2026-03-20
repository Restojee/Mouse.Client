namespace Mouse.NET.Levels.Models;

public class CreateLevelCompletedRequest
{
    
    public string Description { get; set; }
    
    public int LevelId { get; set; }

    public int? UserId { get; set; }
}