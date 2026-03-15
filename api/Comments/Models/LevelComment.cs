using Mouse.NET.Common;
using Mouse.NET.Users.Models;

namespace Mouse.NET.LevelComments.Models;

public class LevelComment : Auditable
{
    public int Id { get; set; }
    
    public string Text { get; set; }
    
    public User user { get; set; }
}

public class LevelCommentRow : Auditable
{
    public int Id { get; set; }

    public string Text { get; set; }

    public LevelCommentRowLevel Level { get; set; }

    public LevelCommentRowUser User { get; set; }
}

public class LevelCommentRowLevel
{
    public int Id { get; set; }

    public string Name { get; set; }
}

public class LevelCommentRowUser
{
    public int Id { get; set; }

    public string Username { get; set; }
}