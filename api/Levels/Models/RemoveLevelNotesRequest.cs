namespace Mouse.NET.Levels.Models;

public class RemoveLevelNotesRequest
{
    public int[] NoteIds { get; set; } = Array.Empty<int>();
}
