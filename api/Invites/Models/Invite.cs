using Mouse.NET.Common;
using Mouse.NET.Users.Models;

namespace Mouse.NET.Invites.Models;

public class Invite : Auditable
{
    public int Id { get; set; }

    public string Token { get; set; }

    public string Email { get; set; }

    public bool IsUsed { get; set; }

    public User CreatedByUser { get; set; }

    public User? RegisteredUser { get; set; }
    
    public DateTime ExpirationDate { get; set; } 
}