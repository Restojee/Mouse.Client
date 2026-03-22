using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Mouse.NET.Auth.Models;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.Invites.Data;
using Mouse.NET.Storage;
using Mouse.NET.Users.Data;
using Mouse.NET.Users.Common;
using Mouse.NET.Users.Models;
using Mouse.NET.Users.Sessions.Services;
using Mouse.NET.Users.Audit.Services;
using Mouse.NET.Users.Audit.Models;
using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.Auth.Services;

public class AuthService: IAuthService
{     
    private readonly IMapper mapper;
    private readonly JwtService jwtService;
    private readonly IInviteRepository inviteRepository;
    private readonly IUserRepository userRepository;
    private readonly MouseDbContext db;
    private readonly IUserSessionLogger userSessionLogger;
    private readonly IAuditLogWriter auditLogWriter;

    public AuthService(
        IMapper mapper,
        IUserRepository userRepository,
        JwtService jwtService,
        IInviteRepository inviteRepository,
        MouseDbContext db,
        IUserSessionLogger userSessionLogger,
        IAuditLogWriter auditLogWriter)
    {
        this.mapper = mapper;
        this.jwtService = jwtService;
        this.inviteRepository = inviteRepository;
        this.userRepository = userRepository;
        this.db = db;
        this.userSessionLogger = userSessionLogger;
        this.auditLogWriter = auditLogWriter;
    }

    private async Task<(List<string> policies, List<string> otherPolicies)> GetRolePolicies(string role)
    {
        var roleId = await this.db.Roles
            .Where(r => r.Name == role)
            .Select(r => (int?)r.Id)
            .FirstOrDefaultAsync();

        if (roleId == null)
        {
            return (new List<string>(), new List<string>());
        }

        var bindings = await this.db.RolePolicyBindings
            .Where(b => b.RoleId == roleId.Value)
            .Select(b => new { b.PolicyType, b.PolicyKey })
            .ToListAsync();

        var policies = bindings
            .Where(b => b.PolicyType == RolePolicyType.Policy)
            .Select(b => b.PolicyKey)
            .Distinct()
            .OrderBy(x => x)
            .ToList();

        var otherPolicies = bindings
            .Where(b => b.PolicyType == RolePolicyType.OtherPolicy)
            .Select(b => b.PolicyKey)
            .Distinct()
            .OrderBy(x => x)
            .ToList();

        return (policies, otherPolicies);
    }

    public int? GetAuthorizedUserId()
    {
        return this.jwtService.GetUserId();
    }

    public bool HasPolicy(string policyKey)
    {
        return this.jwtService.HasPolicy(policyKey);
    }

    public ICollection<string> GetPolicies()
    {
        return this.jwtService.GetPolicies();
    }
    
    public async Task<Account> RegisterAccount (RegisterAccountRequest registerAccountRequest, bool needInvite = true)
    {

        var inviteExists = await this.inviteRepository.GetWorkedInvite(registerAccountRequest.InviteToken);
        if (inviteExists == null && needInvite)
        {
            throw new ApiNotFoundException(
                name: "InviteNotFound",
                messages: new[] { "Приглашение с таким номером не найдено или срок его действия истек" });
        }
        
        var userExists = await this.userRepository.GetUserByUserName(registerAccountRequest.UserName);
        if (userExists != null)
        {
            throw new ApiConflictException(
                name: "UserAlreadyExists",
                messages: new[] { "Пользователь с таким именем уже зарегистрирован" });
        }

        var hashSalt = AuthUtils.GetHashPassword(registerAccountRequest.Password);

        var newUser = await this.userRepository.CreateUser(new UserEntity
        {
            UserName = registerAccountRequest.UserName,
            //Email = registerAccountRequest.UserName,
            PasswordHash = hashSalt.Hash,
            Salt = hashSalt.Salt,
            Role = RoleNames.User,
        });
        
        if (!string.IsNullOrEmpty(registerAccountRequest.InviteToken))
        {
            await this.inviteRepository.UseInvite(registerAccountRequest.InviteToken, newUser.Id);
        }

        var (policies, otherPolicies) = await this.GetRolePolicies(newUser.Role);
        
        return new Account 
        {
            User = this.mapper.Map<UserEntity, User>(newUser),
            AccessToken = JwtUtils.GenerateJwtToken(
                AuthUtils.GetUserClaims(newUser.Id, newUser.UserName, newUser.Email, newUser.Role),
                policies,
                otherPolicies
            ),
            Policies = policies,
            OtherPolicies = otherPolicies,
        };
    }
    
    public async Task<Account> LoginAccount(LoginAccountRequest loginAccountRequest)
    {
        var userExists = await this.userRepository.GetUserByUserName(loginAccountRequest.UserName);
        if (userExists == null)
        {
            await this.userSessionLogger.TryLogLogin(null, false, "invalid_credentials");
            await this.auditLogWriter.TryWrite(new AuditLogEvent
            {
                ActorUserId = null,
                Action = "user.login",
                MetadataJson = "{\"success\":false,\"reason\":\"invalid_credentials\"}",
            });
            throw new ApiBadRequestException(
                name: "InvalidCredentials",
                messages: new[] { "Неправильный логин или пароль" });
        }
                
        var isAccountVerify = AuthUtils.VerifyHashPassword(userExists.PasswordHash, loginAccountRequest.Password, userExists.Salt);
        if (!isAccountVerify)
        {
            await this.userSessionLogger.TryLogLogin(userExists.Id, false, "invalid_credentials");
            await this.auditLogWriter.TryWrite(new AuditLogEvent
            {
                ActorUserId = userExists.Id,
                Action = "user.login",
                MetadataJson = "{\"success\":false,\"reason\":\"invalid_credentials\"}",
            });
            throw new ApiBadRequestException(
                name: "InvalidCredentials",
                messages: new[] { "Неправильный логин или пароль" });
        }

        await this.userSessionLogger.TryLogLogin(userExists.Id, true);
        await this.auditLogWriter.TryWrite(new AuditLogEvent
        {
            ActorUserId = userExists.Id,
            Action = "user.login",
            MetadataJson = "{\"success\":true}",
        });

        var (policies, otherPolicies) = await this.GetRolePolicies(userExists.Role);

        return new Account
        {
            User = this.mapper.Map<UserEntity, User>(userExists),
            AccessToken = JwtUtils.GenerateJwtToken(
                AuthUtils.GetUserClaims(userExists.Id, userExists.UserName, userExists.Email, userExists.Role),
                policies,
                otherPolicies
            ),
            Policies = policies,
            OtherPolicies = otherPolicies,
        };
    }

    public async Task<Account> AdminLoginAccount(LoginAccountRequest loginAccountRequest)
    {
        var userExists = await this.userRepository.GetUserByUserName(loginAccountRequest.UserName);
        if (userExists == null)
        {
            await this.userSessionLogger.TryLogLogin(null, false, "invalid_credentials");
            await this.auditLogWriter.TryWrite(new AuditLogEvent
            {
                ActorUserId = null,
                Action = "admin.login",
                MetadataJson = "{\"success\":false,\"reason\":\"invalid_credentials\"}",
            });
            throw new ApiBadRequestException(
                name: "InvalidCredentials",
                messages: new[] { "Неправильный логин или пароль" });
        }

        var isAccountVerify = AuthUtils.VerifyHashPassword(userExists.PasswordHash, loginAccountRequest.Password, userExists.Salt);
        if (!isAccountVerify)
        {
            await this.userSessionLogger.TryLogLogin(userExists.Id, false, "invalid_credentials");
            await this.auditLogWriter.TryWrite(new AuditLogEvent
            {
                ActorUserId = userExists.Id,
                Action = "admin.login",
                MetadataJson = "{\"success\":false,\"reason\":\"invalid_credentials\"}",
            });
            throw new ApiBadRequestException(
                name: "InvalidCredentials",
                messages: new[] { "Неправильный логин или пароль" });
        }
        
        var (policies, otherPolicies) = await this.GetRolePolicies(userExists.Role);
        var isAllowed = otherPolicies.Contains(nameof(OtherPolicy.Administration));
        if (!isAllowed)
        {
            await this.auditLogWriter.TryWrite(new AuditLogEvent
            {
                ActorUserId = userExists.Id,
                Action = "admin.login",
                MetadataJson = "{\"success\":false,\"reason\":\"missing_permission\"}",
            });
            throw new ApiForbiddenException(
                name: "AccessDenied",
                messages: new[] { "Недостаточно прав для входа в админку" });
        }

        await this.userSessionLogger.TryLogLogin(userExists.Id, true);
        await this.auditLogWriter.TryWrite(new AuditLogEvent
        {
            ActorUserId = userExists.Id,
            Action = "admin.login",
            MetadataJson = "{\"success\":true}",
        });

        return new Account
        {
            User = this.mapper.Map<UserEntity, User>(userExists),
            AccessToken = JwtUtils.GenerateJwtToken(
                AuthUtils.GetUserClaims(userExists.Id, userExists.UserName, userExists.Email, userExists.Role),
                policies,
                otherPolicies
            ),
            Policies = policies,
            OtherPolicies = otherPolicies,
        };
    }

    public async Task ChangePassword(ChangePasswordAccountRequest changePasswordAccountRequest)
    {
        var user = await this.userRepository.GetUser(this.GetAuthorizedUserId().GetValueOrDefault());
        if (user == null)
        {
            throw new ApiNotFoundException(
                name: "UserNotFound",
                messages: new[] { "Пользователь не найден" });
        }
        var hashSalt = AuthUtils.GetHashPassword(changePasswordAccountRequest.NewPassword);
        user.PasswordHash = hashSalt.Hash;
        user.Salt = hashSalt.Salt;

        await this.userRepository.UpdateUser(user);
    }
}