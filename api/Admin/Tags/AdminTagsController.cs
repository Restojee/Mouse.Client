using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Tags.Models;
using Mouse.NET.Tags.services;

namespace Mouse.NET.Admin.Tags;

[ApiController]
[Route("admin/tags")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminTagsController : ControllerBase
{
    private readonly ITagService tagService;

    public AdminTagsController(ITagService tagService)
    {
        this.tagService = tagService;
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.TagsCreate))]
    public async Task<Tag> Create([FromBody] TagCreateRequest createRequest)
    {
        return await this.tagService.CreateTag(createRequest);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.TagsEdit))]
    public async Task<Tag> Update([FromBody] TagUpdateRequest updateRequest)
    {
        return await this.tagService.UpdateTag(updateRequest);
    }

    [HttpDelete("delete/{tagId}")]
    [Authorize(Policy = nameof(Policy.TagsDelete))]
    public async Task<string> Delete([FromRoute] int tagId)
    {
        return await this.tagService.DeleteTag(tagId);
    }
}
