using AutoMapper;
using Mouse.NET.Data.Models;
using Mouse.NET.Tags.Models;

namespace Mouse.NET.Tags;

public class TagMapper : Profile
{
    public TagMapper()
    {
        CreateMap<TagEntity, TagShort>();

        CreateMap<TagEntity, Tag>()
            .ForMember(x => x.ParentTag, opt => opt.MapFrom(src => src.ParentTag));
        CreateMap<TagCreateRequest, TagEntity>();
        CreateMap<TagUpdateRequest, TagEntity>();
        CreateMap<Tag, TagEntity>();
    }
}