using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Common;
using Mouse.NET.Tips.Models;
using Mouse.NET.Tips.services;

namespace Mouse.NET.Tips;

[ApiController]
[Route("tips")]
public class TipController : ControllerBase
{
    
    private readonly ITipService tipService;

    public TipController(ITipService tipService)
    {
        this.tipService = tipService;
    }

    [HttpGet("collect")]
    public async Task<PagedResult<Tip>> GetTipCollection([FromQuery] PaginateRequest request)
    {
        return await this.tipService.GetTipCollection(request);
    }

    [HttpGet("{tipId}")]
    public async Task<Tip> GetTip([FromRoute] int tipId)
    {
        return await this.tipService.GetTip(tipId);
    }
    
    [Authorize(Policy = nameof(Policy.TipsEditSelf))]
    [Authorize(Policy = nameof(Policy.TipsEdit))]
    [HttpPut("update")]
    public async Task<Tip> UpdateTip([FromBody] TipUpdateRequest updateRequest)
    {
        return await this.tipService.UpdateTip(updateRequest);
    }

    [Authorize(Policy = nameof(Policy.TipsCreate))]
    [Authorize(Policy = nameof(Policy.TipsCreateSelf))]
    [HttpPost("create")]
    public async Task<Tip> CreateTip([FromBody] TipCreateRequest createRequest)
    {
        return await this.tipService.CreateTip(createRequest);
    }

    [HttpDelete("delete/{tipId}")]
    [Authorize(Policy = nameof(Policy.TipsDeleteSelf))]
    [Authorize(Policy = nameof(Policy.TipsDelete))]
    public async Task<string> DeleteTips([FromRoute] int tipId)
    {
        return await this.tipService.DeleteTip(tipId);
    }
}