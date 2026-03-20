namespace Mouse.NET.LevelComments.Models;

public class FavoriteCollectRequest
{
    public int? levelId { get; set; }
    
    public int? userId { get; set; }

    public string? SortField { get; set; }

    public string? SortDirection { get; set; }
}