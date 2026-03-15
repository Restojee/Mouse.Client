using AutoMapper;
using Mouse.NET.Data.Models;
using Mouse.NET.Invites.Data;
using Mouse.NET.Invites.Models;
using Mouse.NET.Users.Audit.Models;
using Mouse.NET.Users.Audit.Services;
using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.Invites.Services;

public class InviteService : IInviteService
{
    private readonly IInviteRepository inviteRepository;
    private readonly IMapper mapper;
    private readonly IAuthService authService;
    private readonly IAuditLogWriter auditLogWriter;

    public InviteService(IInviteRepository inviteRepository, IMapper mapper, IAuthService authService, IAuditLogWriter auditLogWriter)
    {
        this.inviteRepository = inviteRepository;
        this.mapper = mapper;
        this.authService = authService;
        this.auditLogWriter = auditLogWriter;
    }
    
    public async Task<Invite> CreateInvite(string email)
    {
        var userId = this.authService.GetAuthorizedUserId().GetValueOrDefault();
        var invite = await this.inviteRepository.CreateInvite(email, userId);

        await this.auditLogWriter.TryWrite(new AuditLogEvent
        {
            ActorUserId = userId,
            Action = "invite.create",
            EntityType = "invite",
            EntityId = invite.Id.ToString(),
            MetadataJson = $"{{\"email\":\"{email}\"}}",
        });

        return this.mapper.Map<InviteEntity, Invite>(invite);
    }
    
    public async Task<Invite> GetInvite(string token)
    {
        var invite = await this.inviteRepository.GetWorkedInvite(token);
        if (invite == null)
        {
            return null;
        }

        return this.mapper.Map<InviteEntity, Invite>(invite);
    }

    public async Task<ICollection<Invite>> GetInviteCollection()
    {
        return this.mapper.Map<ICollection<InviteEntity>, ICollection<Invite>>(await this.inviteRepository.GetInviteCollection());
    }
    
    public async Task RevokeInvites(ICollection<int> ids)
    {
        await this.inviteRepository.RevokeInvites(ids);

        await this.auditLogWriter.TryWrite(new AuditLogEvent
        {
            ActorUserId = this.authService.GetAuthorizedUserId(),
            Action = "invite.revoke",
            EntityType = "invite",
            MetadataJson = ids == null ? null : $"{{\"ids\":[{string.Join(',', ids)}]}}",
        });
    }
}