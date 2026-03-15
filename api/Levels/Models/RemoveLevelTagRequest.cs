namespace Mouse.NET.Levels.Models;

public class RemoveLevelTagRequest
{
    public int? LevelId { get; set; }

    public int[] LevelTagIds { get; set; }
}