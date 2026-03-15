namespace Mouse.NET.Levels.Models;

public class UpdateLevelFavoriteRequest
{
    public int FavoriteId { get; set; }

    public int? UserId { get; set; }

    public int? LevelId { get; set; }

    public string? Description { get; set; }
}
