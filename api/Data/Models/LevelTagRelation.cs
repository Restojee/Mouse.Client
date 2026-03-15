using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mouse.NET.Data.Models;

[Table("level_tag_relations")]
public class LevelTagRelation : AuditableEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("id")]
    public long Id { get; set; }
    
    [Column("level_id")]
    [ForeignKey("Level")]
    public int LevelId { get; set; }
    public LevelEntity Level { get; set; }
    
    [Column("tag_id")]
    [ForeignKey("Tag")]
    public int TagId { get; set; }
    public TagEntity Tag { get; set; }

    [Column("user_id")]
    [ForeignKey("User")]
    public int? UserId { get; set; }
    public UserEntity? User { get; set; }
}
