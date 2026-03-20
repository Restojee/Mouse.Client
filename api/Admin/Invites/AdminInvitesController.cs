using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Invites;
using Mouse.NET.Invites.Models;

namespace Mouse.NET.Admin.Invites;

[ApiController]
[Route("admin/invites")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminInvitesController : ControllerBase
{
    private readonly IInviteService inviteService;

    public AdminInvitesController(IInviteService inviteService)
    {
        this.inviteService = inviteService;
    }

    [HttpGet("collect")]
    [Authorize(Policy = nameof(Policy.InvitesRead))]
    public async Task<ICollection<Invite>> Collect()
    {
        return await this.inviteService.GetInviteCollection();
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.InvitesCreate))]
    public async Task<Invite> Create([FromBody] InviteCreateRequest inviteCreateRequest)
    {
        return await this.inviteService.CreateInvite(inviteCreateRequest.Email);
    }

    [HttpDelete("revoke")]
    [Authorize(Policy = nameof(Policy.InvitesDelete))]
    public async Task<string> Revoke([FromQuery] InviteRevokeRequest request)
    {
        await this.inviteService.RevokeInvites(request.Ids);
        return "Ok";
    }
}
