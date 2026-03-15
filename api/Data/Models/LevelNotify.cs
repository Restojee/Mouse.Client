using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Mouse.NET.Common;
using Mouse.NET.LevelComments.Models;

namespace Mouse.NET.Data.Models;

public class LevelNotify
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Column("level_id")]
    [ForeignKey("Level")]
    public LevelEntity Level { get; set; }
    public int LevelId { get; set; }
    
    [Column("user_id")]
    [ForeignKey("User")]
    public UserEntity User { get; set; }
    public int UserId { get; set; }
    
    [Column("comment_id")]
    [ForeignKey("Comment")]
    public LevelComment? LevelComment { get; set; }
    public int? LevelCommentId { get; set; }
    
    
    public LevelAction LevelAction { get; set; }
}