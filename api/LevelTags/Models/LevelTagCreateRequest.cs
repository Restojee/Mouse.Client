using System.ComponentModel.DataAnnotations;

namespace Mouse.NET.LevelTags.Models;

public class LevelTagCreateRequest
{
    [Required]
    public int LevelId { get; set; }

    [Required]
    public int TagId { get; set; }

    public int? UserId { get; set; }
}
