using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Tips.Models;
using Mouse.NET.Tips.services;

namespace Mouse.NET.Admin.Tips;

[ApiController]
[Route("admin/tips")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminTipsController : ControllerBase
{
    private readonly ITipService tipService;

    public AdminTipsController(ITipService tipService)
    {
        this.tipService = tipService;
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.TipsCreate))]
    public async Task<Tip> Create([FromBody] TipCreateRequest createRequest)
    {
        return await this.tipService.CreateTip(createRequest);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.TipsEdit))]
    public async Task<Tip> Update([FromBody] TipUpdateRequest updateRequest)
    {
        return await this.tipService.UpdateOwnTip(updateRequest);
    }

    [HttpDelete("delete/{tipId}")]
    [Authorize(Policy = nameof(Policy.TipsDelete))]
    public async Task<string> Delete([FromRoute] int tipId)
    {
        return await this.tipService.DeleteTipAdmin(tipId);
    }
}
