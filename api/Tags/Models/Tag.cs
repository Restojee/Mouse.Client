using Mouse.NET.Common;

namespace Mouse.NET.Tags.Models;

public class Tag : Auditable
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }

    public int? ParentTagId { get; set; }

    public TagShort? ParentTag { get; set; }

    public ICollection<Tag> Childs { get; set; } = new List<Tag>();
}