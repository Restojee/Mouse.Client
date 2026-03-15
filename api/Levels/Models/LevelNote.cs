using Mouse.NET.Common;
using Mouse.NET.Users.Models;

namespace Mouse.NET.Levels.Models;

public class LevelNote: Auditable
{
    public int Id { get; set; }

    public User User { get; set; }

    public Level Level { get; set; }

    public string Text { get; set; }

    public string? Description
    {
        get => this.Text;
        set => this.Text = value ?? string.Empty;
    }
}