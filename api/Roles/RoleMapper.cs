using AutoMapper;
using Mouse.NET.Data.Models;
using Mouse.NET.Roles.Models;

namespace Mouse.NET.Roles;

public class RoleProfile : Profile
{
    public RoleProfile()
    {
        CreateMap<RoleEntity, RoleCard>();
        CreateMap<RoleEntity, RoleDetails>();
    }
}
