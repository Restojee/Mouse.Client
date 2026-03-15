using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
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
    
    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.InvitesWrite))]
    public async Task<Invite> CreateInvitation([FromBody] InviteCreateRequest inviteCreateRequest)
    {
        return await this.inviteService.CreateInvite(inviteCreateRequest.Email);
    }
    
    [HttpGet("collect")]
    [Authorize(Policy = nameof(Policy.InvitesRead))]
    public async Task<ICollection<Invite>> GetInvites()
    {
        return await this.inviteService.GetInviteCollection();
    }

    [HttpDelete("revoke")]
    [Authorize(Policy = nameof(Policy.InvitesWrite))]
    public async Task<string> RevokeInvites([FromQuery] InviteRevokeRequest request)
    {
        await this.inviteService.RevokeInvites(request.Ids);
        return "Ok";
    }
}