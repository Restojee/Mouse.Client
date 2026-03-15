namespace Mouse.NET.Tags.Models;

public class TagUpdateRequest
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }

    public int? ParentTagId { get; set; }
}