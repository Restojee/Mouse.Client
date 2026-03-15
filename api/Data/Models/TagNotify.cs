using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Mouse.NET.Common;

namespace Mouse.NET.Data.Models;

public class TagNotify
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Column("tag_id")]
    [ForeignKey("Tag")]
    public TagEntity Tag { get; set; }
    public int TagId { get; set; }
    
    [Column("user_id")]
    [ForeignKey("User")]
    public UserEntity User { get; set; }
    public int UserId { get; set; }
    
    public TagAction TagAction { get; set; }
}