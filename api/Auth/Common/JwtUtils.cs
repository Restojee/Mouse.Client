using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Mouse.NET.Users.Common;
using Mouse.NET.Common;

namespace Mouse.Stick.Controllers.Auth;

public class JwtUtils
{

    static public string GenerateJwtToken(
        Dictionary<string, object> claims,
        IEnumerable<string> policies,
        IEnumerable<string> otherPolicies = null)
    {
        claims ??= new Dictionary<string, object>();
        policies ??= Enumerable.Empty<string>();
        otherPolicies ??= Enumerable.Empty<string>();

        static string GetClaimString(Dictionary<string, object> dict, string key)
        {
            return dict.TryGetValue(key, out var value) ? (value?.ToString() ?? string.Empty) : string.Empty;
        }

        var tokenHandler = new JwtSecurityTokenHandler();

        var key = Encoding
            .ASCII
            .GetBytes("this is my custom Secret key for authnetication");
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
                new[]
                {
                    new Claim(UserDetails.Id, GetClaimString(claims, UserDetails.Id)),
                    new Claim(UserDetails.Username, GetClaimString(claims, UserDetails.Username)),
                    new Claim(UserDetails.Email, GetClaimString(claims, UserDetails.Email)),
                    new Claim(UserDetails.Role, GetClaimString(claims, UserDetails.Role))
                }
                .Concat(policies.Select(p => new Claim("policy", p)))
                .Concat(otherPolicies.Select(p => new Claim("otherPolicy", p)))
            ),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}