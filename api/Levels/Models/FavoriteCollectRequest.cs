using Mouse.NET.Common;

namespace Mouse.NET.LevelComments.Models;

public class FavoriteCollectRequest : PaginateRequest
{
    public int? levelId { get; set; }
    
    public int? userId { get; set; }
}