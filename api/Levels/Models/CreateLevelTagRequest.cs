namespace Mouse.NET.Levels.Models;

public class CreateLevelTagRequest
{
    public int[] TagIds { get; set; }
    
    public int[] LevelIds { get; set; }
    
    public int? UserId { get; set; }
}