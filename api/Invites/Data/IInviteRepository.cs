using Mouse.NET.Data.Models;

namespace Mouse.NET.Invites.Data;

public interface IInviteRepository
{
    public Task<InviteEntity> CreateInvite(string email, int userId);

    public Task UseInvite(string token, int registeredUserId);

    public Task<InviteEntity?> GetWorkedInvite(string token);

    public Task<ICollection<InviteEntity>> GetInviteCollection();

    public Task RevokeInvites(ICollection<int> ids);
}