using AutoMapper;
using Mouse.NET.Data.Models;
using Mouse.NET.Invites.Models;

namespace Mouse.NET.Invites;

public class InviteMapper : Profile
{
    public InviteMapper()
    {
        CreateMap<InviteEntity, Invite>()
            .ForMember(d => d.CreatedByUser, o => o.MapFrom(s => s.User))
            .ForMember(d => d.RegisteredUser, o => o.MapFrom(s => s.RegisteredUser));
    }
}