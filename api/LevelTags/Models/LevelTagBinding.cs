namespace Mouse.NET.LevelTags.Models;

public class LevelTagBinding
{
    public long Id { get; set; }

    public LevelTagBindingLevel Level { get; set; }

    public LevelTagBindingTag Tag { get; set; }

    public LevelTagBindingUser? User { get; set; }

    public DateTime? CreatedUtcDate { get; set; }
}

public class LevelTagBindingLevel
{
    public int Id { get; set; }

    public string Name { get; set; }
}

public class LevelTagBindingTag
{
    public int Id { get; set; }

    public string Name { get; set; }
}

public class LevelTagBindingUser
{
    public int Id { get; set; }

    public string Username { get; set; }
}
