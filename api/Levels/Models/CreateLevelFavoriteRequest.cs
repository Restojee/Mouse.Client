namespace Mouse.NET.Levels.Models;

public class CreateLevelFavoriteRequest
{
    public int[] LevelIds { get; set; }
    
    public int UserId { get; set; }
}