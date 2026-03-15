using Mouse.NET.Common;
using Mouse.NET.Tips.Models;

namespace Mouse.NET.Tips.services;

public interface ITipService
{
    public Task<PagedResult<Tip>> GetTipCollection(PaginateRequest request);

    public Task<Tip> GetTip(int tagId);

    public Task<Tip> CreateTip(TipCreateRequest createRequest);

    public Task<string> DeleteTip(int tagId);
    
    public Task<Tip> UpdateOwnTip(TipUpdateRequest updateRequest);
    
    public Task<Tip> UpdateTip(TipUpdateRequest updateRequest);
}