namespace Mouse.NET.Common;

public class PaginateRequest
{
    public int Page { get; set; } = 1;
    public int Size { get; set; } = 15;

    public string? Search { get; set; }
}