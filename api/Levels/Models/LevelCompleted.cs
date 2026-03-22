using Mouse.NET.Common;
using Mouse.NET.Levels.Models;
using Mouse.NET.Storage.Models;
using Mouse.NET.Users.Models;

namespace Mouse.NET.Levels.dto;

public class LevelCompleted: Auditable
{
    public int Id { get; set; }
    
    public User User { get; set; }
    
    public Level Level { get; set; }
    
    public ImageDto Image { get; set; }
    
    public string? Description { get; set; }
    
    public DateTime CreatedUtcDate { get; set; }
    
    public DateTime ModifiedUtcDate { get; set; }
}