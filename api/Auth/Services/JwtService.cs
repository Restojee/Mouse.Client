using Mouse.NET.Users.Common;

namespace Mouse.NET.Auth.Services;

public class JwtService
{
    private readonly IHttpContextAccessor httpContextAccessor;

    public JwtService(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    public int? GetUserId()
    {
        var userIdClaim = this.httpContextAccessor.HttpContext.User.FindFirst(UserDetails.Id);
        if (userIdClaim != null)
        {
            return int.Parse(userIdClaim.Value);
        }
        return null;
    }

    public bool HasPolicy(string policyKey)
    {
        var user = this.httpContextAccessor.HttpContext?.User;
        if (user == null) return false;

        return user.HasClaim("policy", policyKey) || user.HasClaim("otherPolicy", policyKey);
    }

    public ICollection<string> GetPolicies()
    {
        var user = this.httpContextAccessor.HttpContext?.User;
        if (user == null) return new List<string>();

        var policies = user.FindAll("policy").Select(c => c.Value).ToList();
        var otherPolicies = user.FindAll("otherPolicy").Select(c => c.Value).ToList();
        policies.AddRange(otherPolicies);
        return policies;
    }
}