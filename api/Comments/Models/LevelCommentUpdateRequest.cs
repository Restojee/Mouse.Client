namespace Mouse.NET.LevelComments.Models;

public class LevelCommentUpdateRequest
{
    public int Id { get; set; }
    
    public string Text { get; set; }
}

public class LevelCommentAdminUpdateRequest
{
    public int Id { get; set; }

    public int? LevelId { get; set; }

    public int? UserId { get; set; }

    public string? Text { get; set; }
}

public class LevelCommentBulkDeleteRequest
{
    public ICollection<int> Ids { get; set; } = Array.Empty<int>();
}