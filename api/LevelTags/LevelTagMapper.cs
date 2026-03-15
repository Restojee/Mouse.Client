using AutoMapper;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelTags.Models;

namespace Mouse.NET.LevelTags;

public class LevelTagMapper : Profile
{
    public LevelTagMapper()
    {
        CreateMap<LevelEntity, LevelTagBindingLevel>();
        CreateMap<TagEntity, LevelTagBindingTag>();

        CreateMap<UserEntity, LevelTagBindingUser>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName));

        CreateMap<LevelTagRelation, LevelTagBinding>();
    }
}
