using System.ComponentModel.DataAnnotations;

namespace Mouse.NET.LevelTags.Models;

public class LevelTagUpdateRequest
{
    [Required]
    public long Id { get; set; }

    public int? LevelId { get; set; }

    public int? TagId { get; set; }

    public int? UserId { get; set; }
}
