using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Tags.Models;
using Mouse.NET.Tags.services;

namespace Mouse.NET.Tags;

[ApiController]
[Route("tags")]
public class TagController : ControllerBase
{
    private readonly ITagService tagService;

    public TagController(ITagService tagService)
    {
        this.tagService = tagService;
    }

    [HttpGet("collect")]
    public async Task<ICollection<Tag>> GetTagCollection()
    {
        return await this.tagService.GetTagCollection();
    }

    [HttpGet("by-id/{tagId}")]
    public async Task<Tag> GetTag([FromRoute] int tagId)
    {
        return await this.tagService.GetTag(tagId);
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.TagsCreate))]
    [Authorize(Policy = nameof(Policy.TagsCreateSelf))]
    public async Task<Tag> CreateTag([FromBody] TagCreateRequest createRequest)
    {
        return await this.tagService.CreateTag(createRequest);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.TagsEdit))]
    [Authorize(Policy = nameof(Policy.TagsEditSelf))]
    public async Task<Tag> UpdateTag([FromBody] TagUpdateRequest updateRequest)
    {
        return await this.tagService.UpdateTag(updateRequest);
    }

    [HttpDelete("delete/{tagId}")]
    [Authorize(Policy = nameof(Policy.TagsDelete))]
    [Authorize(Policy = nameof(Policy.TagsDeleteSelf))]
    public async Task<string> DeleteTag([FromRoute] int tagId)
    {
        return await this.tagService.DeleteTag(tagId);
    }
}