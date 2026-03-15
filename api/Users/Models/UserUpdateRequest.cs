namespace Mouse.NET.Users.Models;

public class UserUpdateRequest
{
    public int Id { get; set; }
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? Avatar { get; set; }

    public string? Role { get; set; }
}