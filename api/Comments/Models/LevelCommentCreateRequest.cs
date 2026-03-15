namespace Mouse.NET.LevelComments.Models;

public class LevelCommentCreateRequest
{
    public int LevelId { get; set; }
    
    public string Text { get; set; }
}

public class LevelCommentAdminCreateRequest
{
    public int LevelId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; }
}