using System.Net;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.Storage;
using Mouse.NET.Users.Data;
using Mouse.NET.Users.Models;
using Mouse.NET.Users.Audit.Models;
using Mouse.NET.Users.Audit.Services;
using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.Users.services;

public class UserService : IUserService
{
    
    private readonly IMapper mapper;
    private readonly IUserRepository userRepository;
    private readonly IStorageService storageService;
    private readonly IAuthService authService;
    private readonly IAuditLogWriter auditLogWriter;

    public UserService(
        IMapper mapper,
        IUserRepository userRepository,
        IStorageService storageService,
        IAuthService authService,
        IAuditLogWriter auditLogWriter) {
        this.userRepository = userRepository;
        this.storageService = storageService;
        this.mapper = mapper;
        this.authService = authService;
        this.auditLogWriter = auditLogWriter;
    }
    
    public async Task<PagedResult<User>> GetUserCollection(UserCollectionGetRequest request)
    {
        return mapper.Map<PagedResult<UserEntity>, PagedResult<User>>(await this.userRepository.GetUserCollection(request));
    }

    public async Task<User> GetUser(int userId)
    {
        return mapper.Map<UserEntity, User>(await this.userRepository.GetUser(userId));
    }

    public async Task<User> CreateUser(UserCreateRequest request)
    {
        var userExists = await this.userRepository.GetUserByUserName(request.UserName);
        if (userExists != null)
        {
            throw new ApiConflictException(
                name: "UserAlreadyExists",
                messages: new[] { "Пользователь с таким логином уже существует" });
        }
        return mapper.Map<UserEntity, User>(await this.userRepository.CreateUser(mapper.Map<UserCreateRequest, UserEntity>(request)));
    }

    public async Task<User> UpdateUser(UserUpdateRequest request)
    {
        var userExists = await this.userRepository.GetUser(request.Id);
        if (userExists == null)
        {
            throw new ApiNotFoundException(
                name: "UserNotFound",
                messages: new[] { "Запрашиваемый пользователь не найден" });
        }

        if (!string.IsNullOrWhiteSpace(request.UserName))
        {
            userExists.UserName = request.UserName;
        }

        if (request.Email != null)
        {
            userExists.Email = request.Email;
        }

        if (request.Avatar != null)
        {
            userExists.Avatar = request.Avatar;
        }

        if (request.Role != null)
        {
            userExists.Role = request.Role;
        }

        var updated = await this.userRepository.UpdateUser(userExists);
        await this.auditLogWriter.TryWrite(new AuditLogEvent
        {
            ActorUserId = this.authService.GetAuthorizedUserId(),
            TargetUserId = request.Id,
            Action = "user.update",
            EntityType = "user",
            EntityId = request.Id.ToString(),
        });
        return mapper.Map<UserEntity, User>(updated);
    }

    public async Task<string> DeleteUser(int userId)
    {
        var userExists = await this.userRepository.GetUser(userId);
        if (userExists == null)
        {
            throw new ApiNotFoundException(
                name: "UserNotFound",
                messages: new[] { "Запрашиваемый пользователь не найден" });
        }
        await this.userRepository.DeleteUser(userExists);

        await this.auditLogWriter.TryWrite(new AuditLogEvent
        {
            ActorUserId = this.authService.GetAuthorizedUserId(),
            TargetUserId = userId,
            Action = "user.delete",
            EntityType = "user",
            EntityId = userId.ToString(),
        });
        return "Ok";
    }
    
    public async Task<User> UpdateMyAvatar(IFormFile file)
    {
        var user = await this.userRepository.GetUser(this.authService.GetAuthorizedUserId().GetValueOrDefault());
        user.Avatar = await this.storageService.Upload(file);
        var updated = await this.userRepository.UpdateUser(user);
        await this.auditLogWriter.TryWrite(new AuditLogEvent
        {
            ActorUserId = this.authService.GetAuthorizedUserId(),
            TargetUserId = updated.Id,
            Action = "user.avatar.update",
            EntityType = "user",
            EntityId = updated.Id.ToString(),
        });
        return this.mapper.Map<UserEntity, User>(updated);
    }
}