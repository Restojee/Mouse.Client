namespace Mouse.NET.Levels.Models;

public class CreateLevelNoteRequest
{
    public int UserId { get; set; }

    public int LevelId { get; set; }

    public string Text { get; set; }
}
