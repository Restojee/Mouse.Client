using Mouse.NET.Common;
using Mouse.NET.Users.Models;

namespace Mouse.NET.Levels.Models;

public class LevelFavorite: Auditable
{
    public int Id { get; set; }
    
    public User User { get; set; }
    
    public Level Level { get; set; }
    
    public string? Description { get; set; }
    
    public DateTime CreatedUtcDate { get; set; }
    
    public DateTime ModifiedUtcDate { get; set; }
}