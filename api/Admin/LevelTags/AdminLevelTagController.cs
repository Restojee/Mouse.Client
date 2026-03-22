using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.LevelTags.Models;
using Mouse.NET.LevelTags.Services;

namespace Mouse.NET.Admin.LevelTags;

[ApiController]
[Route("admin/level-tags")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminLevelTagController : ControllerBase
{
    private readonly ILevelTagService service;

    public AdminLevelTagController(ILevelTagService service)
    {
        this.service = service;
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.LevelsCreate))]
    [Authorize(Policy = nameof(OtherPolicy.Administration))]
    public async Task<LevelTagBinding> Create([FromBody] LevelTagCreateRequest request)
    {
        return await this.service.Create(request);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.LevelsEdit))]
    [Authorize(Policy = nameof(OtherPolicy.Administration))]
    public async Task<LevelTagBinding> Update([FromBody] LevelTagUpdateRequest request)
    {
        return await this.service.Update(request);
    }

    [HttpDelete("delete/{id:long}")]
    [Authorize(Policy = nameof(Policy.LevelsDelete))]
    [Authorize(Policy = nameof(OtherPolicy.Administration))]
    public async Task<string> Delete([FromRoute] long id)
    {
        await this.service.Delete(id);
        return "Ok";
    }
}
