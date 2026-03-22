namespace Mouse.NET.Common.Services;

public interface IOwnershipService
{
    void EnsureCanEdit(int? ownerId, string entityName, string? requiredPolicy = null);

    void EnsureCanDelete(int? ownerId, string entityName, string? requiredPolicy = null);

    void EnsureCanModify(int? ownerId, bool isDelete, string entityName, string? requiredPolicy = null);

    bool HasPolicy(string requiredPolicy);
}
