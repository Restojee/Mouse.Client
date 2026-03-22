using AutoMapper;
using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.Levels.dto;
using Mouse.NET.Levels.Models;
using Mouse.NET.Storage.Mapping;

namespace Mouse.NET.Levels;

public class LevelProfile : Profile
{
    public LevelProfile()
    {
        CreateMap<LevelEntity, Level>()
            .ForMember(d => d.Image, o => o.MapFrom<LevelImageResolver>());

        CreateMap<Level, LevelEntity>()
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Image != null ? s.Image.Name : null));
        CreateMap<LevelCreateRequest, LevelEntity>();

        CreateMap<LevelNoteEntity, LevelNote>();
        CreateMap<LevelNote, LevelNoteEntity>();
        CreateMap<PagedResult<LevelEntity>, PagedResult<Level>>();
        CreateMap<LevelCompleteRequest, LevelCompletedEntity>();
        CreateMap<LevelFavoriteRequest, LevelFavoriteEntity>();
        CreateMap<LevelUnCompleteRequest, LevelCompletedEntity>();
        CreateMap<LevelUnFavoriteRequest, LevelFavoriteEntity>();
        CreateMap<LevelUpdateRequest, LevelEntity>();
        CreateMap<LevelImageUpdateRequest, LevelEntity>();
        CreateMap<LevelCompletedEntity, LevelCompleted>()
            .ForMember(d => d.Image, o => o.MapFrom<CompletedImageResolver>())
            .ForMember(d => d.Level, o => o.MapFrom(s => s.Level));
        CreateMap<LevelFavoriteEntity, LevelFavorite>()
            .ForMember(d => d.Level, o => o.MapFrom(s => s.Level));
    }
}