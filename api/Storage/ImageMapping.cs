using AutoMapper;
using Mouse.NET.Data.Models;
using Mouse.NET.Levels.dto;
using Mouse.NET.Levels.Models;
using Mouse.NET.Storage.Models;

namespace Mouse.NET.Storage.Mapping;

public sealed class LevelImageResolver : IValueResolver<LevelEntity, Level, ImageDto>
{
    private readonly IStorageService storageService;

    public LevelImageResolver(IStorageService storageService)
    {
        this.storageService = storageService;
    }

    public ImageDto Resolve(LevelEntity source, Level destination, ImageDto destMember, ResolutionContext context)
    {
        return this.storageService.BuildImageDto(source.Image);
    }
}

public sealed class CompletedImageResolver : IValueResolver<LevelCompletedEntity, LevelCompleted, ImageDto>
{
    private readonly IStorageService storageService;

    public CompletedImageResolver(IStorageService storageService)
    {
        this.storageService = storageService;
    }

    public ImageDto Resolve(LevelCompletedEntity source, LevelCompleted destination, ImageDto destMember, ResolutionContext context)
    {
        return this.storageService.BuildImageDto(source.Image);
    }
}
