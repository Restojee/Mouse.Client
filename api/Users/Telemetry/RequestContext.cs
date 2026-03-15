using Microsoft.AspNetCore.Http;

namespace Mouse.NET.Users.Telemetry;

public class RequestContext : IRequestContext
{
    private readonly IHttpContextAccessor httpContextAccessor;

    public RequestContext(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    public string? Ip
    {
        get
        {
            var ctx = this.httpContextAccessor.HttpContext;
            return ctx?.Connection.RemoteIpAddress?.ToString();
        }
    }

    public string? UserAgent
    {
        get
        {
            var ctx = this.httpContextAccessor.HttpContext;
            if (ctx == null)
            {
                return null;
            }

            if (ctx.Request.Headers.TryGetValue("User-Agent", out var ua))
            {
                return ua.ToString();
            }

            return null;
        }
    }

    public string? Device
    {
        get
        {
            var ctx = this.httpContextAccessor.HttpContext;
            if (ctx == null)
            {
                return null;
            }

            if (ctx.Request.Headers.TryGetValue("X-Device", out var device))
            {
                return device.ToString();
            }

            return null;
        }
    }
}
