using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mouse.NET.Data.Models;

[Table("permissions")]
public class PermissionEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Column("key")]
    public string Key { get; set; }

    [Column("description")]
    public string? Description { get; set; }
}
