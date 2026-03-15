using AutoMapper;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelComments.Models;

namespace Mouse.NET.LevelComments;

public class LevelCommentMapper : Profile
{
    public LevelCommentMapper()
    {
        CreateMap<LevelCommentEntity, LevelComment>();

        CreateMap<LevelEntity, LevelCommentRowLevel>();
        CreateMap<UserEntity, LevelCommentRowUser>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName));

        CreateMap<LevelCommentEntity, LevelCommentRow>();

        CreateMap<LevelCommentCreateRequest, LevelCommentEntity>();
        CreateMap<LevelCommentUpdateRequest, LevelCommentEntity>();
    }
}