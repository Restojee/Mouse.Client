using Mouse.NET.Data.Models;
using Mouse.NET.Common;
using Mouse.NET.LevelTags.Models;

namespace Mouse.NET.LevelTags.Data;

public interface ILevelTagRepository
{
    public Task<PagedResult<LevelTagRelation>> GetCollection(LevelTagCollectRequest request);

    public Task<LevelTagRelation?> GetById(long id);

    public Task<LevelTagRelation> Create(LevelTagRelation relation);

    public Task<LevelTagRelation?> Update(long id, int? levelId, int? tagId, int? userId);

    public Task Delete(long id);

    public Task Remove(long id);
}
