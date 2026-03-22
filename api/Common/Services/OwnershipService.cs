using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.Common.Services;

public class OwnershipService : IOwnershipService
{
    private readonly IAuthService authService;

    public OwnershipService(IAuthService authService)
    {
        this.authService = authService;
    }

    public void EnsureCanEdit(int? ownerId, string entityName, string? requiredPolicy = null)
    {
        EnsureCanModify(ownerId, false, entityName, requiredPolicy);
    }

    public void EnsureCanDelete(int? ownerId, string entityName, string? requiredPolicy = null)
    {
        EnsureCanModify(ownerId, true, entityName, requiredPolicy);
    }

    public void EnsureCanModify(int? ownerId, bool isDelete, string entityName, string? requiredPolicy = null)
    {
        var currentUserId = this.authService.GetAuthorizedUserId();
        var isOwner = ownerId == currentUserId;

        if (isOwner)
        {
            return;
        }

        // Если передана политика и у пользователя она есть - разрешаем
        if (requiredPolicy != null && HasPolicy(requiredPolicy))
        {
            return;
        }

        var action = isDelete ? "удалять" : "редактировать";
        throw new ApiForbiddenException(
            name: "Forbidden",
            messages: new[] { $"Вы не можете {action} чужую запись" });
    }

    public bool HasPolicy(string requiredPolicy)
    {
        var userPolicies = this.authService.GetPolicies();
        return userPolicies.Contains(requiredPolicy);
    }
}
