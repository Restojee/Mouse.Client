namespace Mouse.NET.Storage.Models;

public sealed class ImageDto
{
    public string? Name { get; set; }

    public IDictionary<string, string> Variants { get; set; } = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
}
