using AutoMapper;
using System.Net;
using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.LevelComments.Models;
using Mouse.NET.Levels.Data;
using Mouse.NET.Levels.dto;
using Mouse.NET.Levels.Models;
using Mouse.NET.Storage;
using Mouse.NET.Users.Data;
using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.Levels.services;

public class LevelService : ILevelService
{
    
    private readonly IMapper mapper;
    private readonly ILevelRepository levelRepository;
    private readonly IUserRepository userRepository;
    private readonly IStorageService storageService;
    private readonly IAuthService authService;

    public LevelService(IMapper mapper, ILevelRepository levelRepository, IUserRepository userRepository, IStorageService storageService, IAuthService authService) {
        this.levelRepository = levelRepository;
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.storageService = storageService;
        this.authService = authService;
    }
    
    public async Task<PagedResult<Level>> GetLevelCollection(LevelCollectionGetRequest request)
    {
        return mapper.Map<PagedResult<LevelEntity>, PagedResult<Level>>(await this.levelRepository.GetLevelCollection(request));
    }
    
    public async Task<List<LevelFavorite>> GetLevelFavoriteCollection(FavoriteCollectRequest request)
    {
        return mapper.Map<List<LevelFavoriteEntity>, List<LevelFavorite>>(await this.levelRepository.GetLevelFavoriteCollection(request));
    }
    
    public async Task<List<LevelCompleted>> GetLevelCompletedCollection(CompletedCollectRequest request)
    {
        return mapper.Map<List<LevelCompletedEntity>, List<LevelCompleted>>(await this.levelRepository.GetLevelCompletedCollection(request));
    }

    public async Task<Level> GetLevel(int levelId)
    {
        var userId = this.authService.GetAuthorizedUserId();
        var levelExists = mapper.Map<LevelEntity, Level>(await this.levelRepository.GetLevel(levelId, userId));
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        await this.levelRepository.CreateLevelVisit(new LevelVisitEntity { LevelId = levelId, UserId = userId  });
        return levelExists;
    }

    public async Task<Level> CreateLevel(LevelCreateRequest request)
    {
        var level = mapper.Map<LevelCreateRequest, LevelEntity>(request);
        level.UserId = this.authService.GetAuthorizedUserId().GetValueOrDefault();
        return mapper.Map<LevelEntity, Level>(await this.levelRepository.CreateLevel(level));
    }

    public async Task<Level> UpdateLevel(LevelUpdateRequest request)
    {
        var levelExists = await this.levelRepository.GetLevel(request.Id);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        if (levelExists.UserId != this.authService.GetAuthorizedUserId())
        {
            throw new ApiForbiddenException(
                name: "Forbidden",
                messages: new[] { "Нет доступа к редактированию этой карты" });
        }
        return this.mapper.Map<LevelEntity, Level>(await this.levelRepository.UpdateLevel(this.mapper.Map(request, levelExists)));
    }

    public async Task<string> DeleteLevel(int levelId)
    {
        var levelExists = await this.levelRepository.GetLevel(levelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        if (levelExists.UserId != this.authService.GetAuthorizedUserId())
        {
            throw new ApiForbiddenException(
                name: "Forbidden",
                messages: new[] { "Нет доступа к удалению этой карты" });
        }
        await this.levelRepository.DeleteLevel(levelExists);
        return "Ok";
    }
    
    public async Task<Level> SetLevelTags(LevelTagsSetRequest request)
    {
        var levelExists = await this.levelRepository.GetLevel(request.LevelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        return mapper.Map<LevelEntity, Level>(await this.levelRepository.SetLevelTags(levelExists, request.TagIds));
    }

    public async Task<Level> SetLevelNote(LevelNoteSetRequest request)
    {
        var levelExists = await this.levelRepository.GetLevel(request.LevelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        var userId = this.authService.GetAuthorizedUserId();
        var levelNoteExists = await this.levelRepository.GetLevelNote(request.LevelId, userId.GetValueOrDefault());
        if (levelNoteExists == null)
        {
            await this.levelRepository.CreateLevelNote(new LevelNoteEntity
            {
                UserId = userId.GetValueOrDefault(),
                LevelId = request.LevelId,
                Text = request.Text
            });
        }
        else
        {
            levelNoteExists.Text = request.Text;
            await this.levelRepository.UpdateLevelNote(levelNoteExists);
        }
        return mapper.Map<LevelEntity, Level>(await this.levelRepository.GetLevel(request.LevelId, userId.GetValueOrDefault()));
    }

    public async Task<List<LevelNote>> CollectLevelNotes(LevelNoteCollectRequest request)
    {
        var notes = await this.levelRepository.CollectLevelNotes(request.UserId, request.LevelId);

        var query = (request.Query ?? string.Empty).Trim().ToLowerInvariant();
        var filtered = string.IsNullOrWhiteSpace(query) 
            ? notes
            : notes.Where(n =>
                (n.Text != null && n.Text.ToLowerInvariant().Contains(query)) ||
                (n.Level != null && n.Level.Name != null && n.Level.Name.ToLowerInvariant().Contains(query)) ||
                (n.User != null && n.User.UserName != null && n.User.UserName.ToLowerInvariant().Contains(query))
            ).ToList();

        filtered = ApplyNoteSorting(filtered, request);

        return mapper.Map<List<LevelNoteEntity>, List<LevelNote>>(filtered);
    }

    private static List<LevelNoteEntity> ApplyNoteSorting(List<LevelNoteEntity> notes, LevelNoteCollectRequest request)
    {
        var field = request.SortField;
        var direction = request.SortDirection;

        if (string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(direction))
        {
            return notes.OrderByDescending(x => x.CreatedUtcDate).ToList();
        }

        var isDesc = string.Equals(direction, "desc", StringComparison.OrdinalIgnoreCase);

        return field switch
        {
            "level" => isDesc ? notes.OrderByDescending(x => x.Level.Name).ToList() : notes.OrderBy(x => x.Level.Name).ToList(),
            "user" => isDesc ? notes.OrderByDescending(x => x.User.UserName).ToList() : notes.OrderBy(x => x.User.UserName).ToList(),
            "description" => isDesc ? notes.OrderByDescending(x => x.Text).ToList() : notes.OrderBy(x => x.Text).ToList(),
            "createdUtcDate" => isDesc ? notes.OrderByDescending(x => x.CreatedUtcDate).ToList() : notes.OrderBy(x => x.CreatedUtcDate).ToList(),
            _ => notes.OrderByDescending(x => x.CreatedUtcDate).ToList(),
        };
    }

    public async Task<LevelNote> CreateLevelNote(CreateLevelNoteRequest request)
    {
        var levelExists = await this.levelRepository.GetLevel(request.LevelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }

        var userId = request.UserId ?? this.authService.GetAuthorizedUserId().GetValueOrDefault();
        var userExists = await this.userRepository.GetUser(userId);
        if (userExists == null)
        {
            throw new ApiNotFoundException(
                name: "UserNotFound",
                messages: new[] { "Пользователь не найден" });
        }

        var note = new LevelNoteEntity
        {
            LevelId = request.LevelId,
            UserId = userId,
            Text = request.Text,
        };

        await this.levelRepository.CreateLevelNote(note);

        var created = await this.levelRepository.GetLevelNoteById(note.Id);
        return this.mapper.Map<LevelNoteEntity, LevelNote>(created);
    }

    public async Task<LevelNote> UpdateLevelNote(UpdateLevelNoteRequest request)
    {
        var note = await this.levelRepository.GetLevelNoteById(request.NoteId);
        if (note == null)
        {
            throw new ApiNotFoundException(
                name: "NoteNotFound",
                messages: new[] { "Заметка не найдена" });
        }

        if (request.UserId.HasValue)
        {
            var userExists = await this.userRepository.GetUser(request.UserId.Value);
            if (userExists == null)
            {
                throw new ApiNotFoundException(
                    name: "UserNotFound",
                    messages: new[] { "Пользователь не найден" });
            }
            note.UserId = request.UserId.Value;
        }

        if (request.LevelId.HasValue)
        {
            var levelExists = await this.levelRepository.GetLevel(request.LevelId.Value);
            if (levelExists == null)
            {
                throw new ApiNotFoundException(
                    name: "LevelNotFound",
                    messages: new[] { "Запрашиваемая карта не найдена" });
            }
            note.LevelId = request.LevelId.Value;
        }

        if (request.Text != null)
        {
            note.Text = request.Text;
        }

        await this.levelRepository.UpdateLevelNote(note);

        var updated = await this.levelRepository.GetLevelNoteById(note.Id);
        return this.mapper.Map<LevelNoteEntity, LevelNote>(updated);
    }

    public async Task RemoveLevelNotes(RemoveLevelNotesRequest request)
    {
        await this.levelRepository.RemoveLevelNotes(request.NoteIds);
    }

    public async Task<LevelCompleted> CompleteLevel(int levelId, IFormFile file, string description)
    {
        var userId = this.authService.GetAuthorizedUserId();
        var levelExists = await this.levelRepository.GetLevel(levelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }

        var completed = await this.levelRepository.CompleteLevel(new LevelCompletedEntity
        {
            Description = description,
            LevelId = levelId,
            UserId = userId.GetValueOrDefault(),
            Image = await this.storageService.Upload(file)
        });

        return this.mapper.Map<LevelCompletedEntity, LevelCompleted>(completed);
    }
    
    public async Task UnCompleteLevel(int completedId)
    {
        var levelCompletedExists = await this.levelRepository.GetCompletedLevel(completedId, this.authService.GetAuthorizedUserId().GetValueOrDefault());
        if (levelCompletedExists == null)
        {
            throw new ApiNotFoundException(
                name: "CompletedNotFound",
                messages: new[] { "Запрашиваемое прохождение не найдено" });
        }
        if (levelCompletedExists != null)
        {
            await this.levelRepository.UnCompleteLevel(levelCompletedExists);
        }
    }
    
    public async Task FavoriteLevel(int levelId)
    {
        var userId = this.authService.GetAuthorizedUserId();
        var levelExists = await this.levelRepository.GetLevel(levelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        if (await this.levelRepository.GetFavoriteLevel(levelId, userId.GetValueOrDefault()) != null)
        {
            return;
        }
        await this.levelRepository.FavoriteLevel(new LevelFavoriteEntity
        {
            LevelId = levelId,
            UserId = userId.GetValueOrDefault()
        });
    }
    
    public async Task UnFavoriteLevel(int levelId)
    {
        if (await this.levelRepository.GetLevel(levelId) == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        var levelFavoriteExists = await this.levelRepository.GetFavoriteLevel(levelId, this.authService.GetAuthorizedUserId().GetValueOrDefault());
        if (levelFavoriteExists != null)
        {
            await this.levelRepository.UnFavoriteLevel(levelFavoriteExists);
        }
    }
    
    public async Task UpdateLevelImage(int levelId, IFormFile file)
    {
        var levelExists = await this.levelRepository.GetLevel(levelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        if (levelExists.UserId != this.authService.GetAuthorizedUserId())
        {
            throw new ApiForbiddenException(
                name: "Forbidden",
                messages: new[] { "Нет доступа к редактированию этой карты" });
        }
        levelExists.Image = await this.storageService.Upload(file);
        await this.levelRepository.UpdateLevel(levelExists);
    }

    public async Task RemoveLevelCompleted(RemoveLevelCompletedRequest request)
    {
        await this.levelRepository.RemoveLevelCompleted(request.LevelCompletedIds);
    }

    public async Task<LevelCompleted> CreateLevelCompleted(CreateLevelCompletedRequest request)
    {
        var levelExists = await this.levelRepository.GetLevel(request.LevelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        var userId = request.UserId ?? this.authService.GetAuthorizedUserId().GetValueOrDefault();
        return this.mapper.Map<LevelCompletedEntity, LevelCompleted>(
            await this.levelRepository.CompleteLevel(new LevelCompletedEntity
            {
                Description = request.Description,
                LevelId = request.LevelId,
                UserId = userId,
                Image = "",
            }));
    }

    public async Task RemoveLevelFavorite(RemoveLevelFavoriteRequest request)
    {
        await this.levelRepository.RemoveLevelFavorite(request.LevelFavoriteIds);
    }

    public async Task CreateLevelTag(CreateLevelTagRequest request)
    {
        var userId = request.UserId ?? this.authService.GetAuthorizedUserId().GetValueOrDefault();
        await this.levelRepository.CreateLevelTags(request.LevelIds, request.TagIds, userId);
    }
    
    public async Task RemoveLevelTag(RemoveLevelTagRequest request)
    {
        if (request.LevelId != null)
        {
            await this.levelRepository.RemoveLevelTagsByLevelAndTagIds(request.LevelId.Value, request.LevelTagIds);
            return;
        }

        await this.levelRepository.RemoveLevelTags(request.LevelTagIds);
    }

    public async Task UpdateLevelCompletedImage(int completedId, IFormFile formFile)
    {
        var completedExists = await this.levelRepository.GetCompletedLevel(completedId);
        if (completedExists == null)
        {
            throw new ApiNotFoundException(
                name: "CompletedNotFound",
                messages: new[] { "Запрашиваемое выполнение не найдено" });
        }

        var image = await this.storageService.Upload(formFile);
        completedExists.Image = image;

        await this.levelRepository.UpdateCompletedLevel(completedExists);
    }

    public async Task<LevelCompleted> UpdateLevelCompleted(UpdateLevelCompletedRequest request)
    {
        var completedExists = await this.levelRepository.GetCompletedLevel(request.CompletedId);
        if (completedExists == null)
        {
            throw new ApiNotFoundException(
                name: "CompletedNotFound",
                messages: new[] { "Запрашиваемое выполнение не найдено" });
        }

        completedExists.Description = request.Description;

        if (request.UserId != null)
        {
            completedExists.UserId = request.UserId.Value;
        }

        if (request.LevelId != null)
        {
            completedExists.LevelId = request.LevelId.Value;
        }
        await this.levelRepository.UpdateCompletedLevel(completedExists);
        
        return this.mapper.Map<LevelCompletedEntity, LevelCompleted>(completedExists);
    }

    public async Task CreateLevelFavorite(CreateLevelFavoriteRequest request)
    {
        var userId = request.UserId ?? this.authService.GetAuthorizedUserId().GetValueOrDefault();
        await this.levelRepository.CreateLevelFavorite(request.LevelIds, userId);
    }

    public async Task<LevelFavorite> UpdateLevelFavorite(UpdateLevelFavoriteRequest request)
    {
        var favoriteExists = await this.levelRepository.GetLevelFavorite(request.FavoriteId);
        if (favoriteExists == null)
        {
            throw new ApiNotFoundException(
                name: "FavoriteNotFound",
                messages: new[] { "Запрашиваемое избранное не найдено" });
        }

        if (request.UserId != null)
        {
            favoriteExists.UserId = request.UserId.Value;
        }

        if (request.LevelId != null)
        {
            favoriteExists.LevelId = request.LevelId.Value;
        }

        favoriteExists.Description = request.Description;
        await this.levelRepository.UpdateFavoriteLevel(favoriteExists);

        var updated = await this.levelRepository.GetLevelFavorite(request.FavoriteId);
        return this.mapper.Map<LevelFavoriteEntity, LevelFavorite>(updated);
    }

    public async Task<Level> UpdateLevelAdmin(LevelUpdateRequest request)
    {
        var levelExists = await this.levelRepository.GetLevel(request.Id);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        return this.mapper.Map<LevelEntity, Level>(await this.levelRepository.UpdateLevel(this.mapper.Map(request, levelExists)));
    }

    public async Task<string> DeleteLevelAdmin(int levelId)
    {
        var levelExists = await this.levelRepository.GetLevel(levelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        await this.levelRepository.DeleteLevel(levelExists);
        return "Ok";
    }

    public async Task UpdateLevelImageAdmin(int levelId, IFormFile file)
    {
        var levelExists = await this.levelRepository.GetLevel(levelId);
        if (levelExists == null)
        {
            throw new ApiNotFoundException(
                name: "LevelNotFound",
                messages: new[] { "Запрашиваемая карта не найдена" });
        }
        levelExists.Image = await this.storageService.Upload(file);
        await this.levelRepository.UpdateLevel(levelExists);
    }
}