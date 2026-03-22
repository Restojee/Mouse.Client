using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Auth.Services;
using Mouse.NET.Common;
using Mouse.NET.LevelTags.Models;
using Mouse.NET.LevelTags.Services;
using Mouse.NET.Users.Audit.Services;

namespace Mouse.NET.LevelTags;

[ApiController]
[Route("level-tags")]
[Route("api/level-tags")]
public class LevelTagController : ControllerBase
{
    private readonly ILevelTagService service;
    private readonly JwtService jwtService;
    private readonly IAuditLogWriter auditLogWriter;

    public LevelTagController(ILevelTagService service, JwtService jwtService, IAuditLogWriter auditLogWriter)
    {
        this.service = service;
        this.jwtService = jwtService;
        this.auditLogWriter = auditLogWriter;
    }

    [HttpGet("collect")]
    public async Task<PagedResult<LevelTagBinding>> Collect([FromQuery] LevelTagCollectRequest request)
    {
        await this.auditLogWriter.TryWrite(
            actorUserId: this.jwtService.GetUserId(),
            action: "level_tags.collect",
            entityType: "level_tag",
            entityId: null,
            metadataJson: JsonSerializer.Serialize(new
            {
                request.Page,
                request.Size,
                request.Query,
                request.LevelId,
                request.TagId,
                request.UserId,
            }));

        return await this.service.Collect(request);
    }

    [HttpGet("by-id/{id:long}")]
    public async Task<LevelTagBinding> GetById([FromRoute] long id)
    {
        await this.auditLogWriter.TryWrite(
            actorUserId: this.jwtService.GetUserId(),
            action: "level_tags.get_by_id",
            entityType: "level_tag",
            entityId: id.ToString());

        return await this.service.GetById(id);
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.LevelTagCreate))]
    [Authorize(Policy = nameof(Policy.LevelTagCreateSelf))]
    public async Task<LevelTagBinding> Create([FromBody] LevelTagCreateRequest request)
    {
        await this.auditLogWriter.TryWrite(
            actorUserId: this.jwtService.GetUserId(),
            action: "level_tags.create",
            entityType: "level_tag",
            entityId: null,
            metadataJson: JsonSerializer.Serialize(new
            {
                request.LevelId,
                request.TagId,
                request.UserId,
            }));

        return await this.service.Create(request);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.LevelTagEdit))]
    [Authorize(Policy = nameof(Policy.LevelTagEditSelf))]
    public async Task<LevelTagBinding> Update([FromBody] LevelTagUpdateRequest request)
    {
        await this.auditLogWriter.TryWrite(
            actorUserId: this.jwtService.GetUserId(),
            action: "level_tags.update",
            entityType: "level_tag",
            entityId: request.Id.ToString(),
            metadataJson: JsonSerializer.Serialize(new
            {
                request.LevelId,
                request.TagId,
                request.UserId,
            }));

        return await this.service.Update(request);
    }

    [HttpDelete("delete/{id:long}")]
    [Authorize(Policy = nameof(Policy.LevelTagDelete))]
    [Authorize(Policy = nameof(Policy.LevelTagDeleteSelf))]
    public async Task<string> Delete([FromRoute] long id)
    {
        await this.auditLogWriter.TryWrite(
            actorUserId: this.jwtService.GetUserId(),
            action: "level_tags.delete",
            entityType: "level_tag",
            entityId: id.ToString());

        await this.service.Delete(id);
        return "Ok";
    }
}
