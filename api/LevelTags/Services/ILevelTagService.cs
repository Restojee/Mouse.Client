using Mouse.NET.Common;
using Mouse.NET.LevelTags.Models;

namespace Mouse.NET.LevelTags.Services;

public interface ILevelTagService
{
    public Task<PagedResult<LevelTagBinding>> Collect(LevelTagCollectRequest request);

    public Task<LevelTagBinding> GetById(long id);

    public Task<LevelTagBinding> Create(LevelTagCreateRequest request);

    public Task<LevelTagBinding> Update(LevelTagUpdateRequest request);

    public Task Delete(long id);

    public Task Remove(long id);
}
