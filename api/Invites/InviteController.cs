using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Invites.Models;

namespace Mouse.NET.Invites;

[ApiController]
[Route("api/invites")]
public class InviteController : ControllerBase
{
    private readonly IInviteService inviteService;

    public InviteController(IInviteService inviteService)
    {
        this.inviteService = inviteService;
    }

    [HttpGet("by-token/{token}")]
    public async Task<Invite> GetByToken([FromRoute] string token)
    {
        return await this.inviteService.GetInvite(token);
    }
}