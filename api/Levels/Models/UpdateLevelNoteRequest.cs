namespace Mouse.NET.Levels.Models;

public class UpdateLevelNoteRequest
{
    public int NoteId { get; set; }

    public int? UserId { get; set; }

    public int? LevelId { get; set; }

    public string? Text { get; set; }
}
