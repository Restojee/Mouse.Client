using AutoMapper;
using System.Net;
using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelTags.Data;
using Mouse.NET.LevelTags.Models;

namespace Mouse.NET.LevelTags.Services;

public class LevelTagService : ILevelTagService
{
    private readonly IMapper mapper;
    private readonly ILevelTagRepository repository;

    public LevelTagService(IMapper mapper, ILevelTagRepository repository)
    {
        this.mapper = mapper;
        this.repository = repository;
    }

    public async Task<PagedResult<LevelTagBinding>> Collect(LevelTagCollectRequest request)
    {
        var paged = await this.repository.GetCollection(request);
        var records = this.mapper.Map<ICollection<LevelTagBinding>>(paged.Records);
        return new PagedResult<LevelTagBinding>(records, paged.Page, paged.PageSize, paged.TotalItems, paged.TotalPages);
    }

    public async Task<LevelTagBinding> GetById(long id)
    {
        var entity = await this.repository.GetById(id);
        if (entity == null)
        {
            throw new ApiNotFoundException(
                name: "LevelTagNotFound",
                messages: new[] { "Привязка тегов не найдена" });
        }

        return this.mapper.Map<LevelTagBinding>(entity);
    }

    public async Task<LevelTagBinding> Create(LevelTagCreateRequest request)
    {
        var created = await this.repository.Create(new LevelTagRelation
        {
            LevelId = request.LevelId,
            TagId = request.TagId,
            UserId = request.UserId,
        });

        return this.mapper.Map<LevelTagBinding>(created);
    }

    public async Task<LevelTagBinding> Update(LevelTagUpdateRequest request)
    {
        var updated = await this.repository.Update(request.Id, request.LevelId, request.TagId, request.UserId);
        if (updated == null)
        {
            throw new ApiNotFoundException(
                name: "LevelTagNotFound",
                messages: new[] { "Привязка тегов не найдена" });
        }

        return this.mapper.Map<LevelTagBinding>(updated);
    }

    public async Task Delete(long id)
    {
        await this.repository.Delete(id);
    }

    public async Task Remove(long id)
    {
        await this.Delete(id);
    }
}
