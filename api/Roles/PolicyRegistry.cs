using Mouse.NET.Common;

namespace Mouse.NET.Roles;

public static class PolicyRegistry
{
    public static readonly PolicyDefinition[] All = new[]
    {
        // CRUD policies
        new PolicyDefinition("comments", "Комментарии",
            create: nameof(Policy.CommentsCreate),
            read: nameof(Policy.CommentsRead),
            update: nameof(Policy.CommentsEdit),
            delete: nameof(Policy.CommentsDelete)),

        new PolicyDefinition("invites", "Приглашения",
            create: nameof(Policy.InvitesCreate),
            read: nameof(Policy.InvitesRead),
            update: nameof(Policy.InvitesEdit),
            delete: nameof(Policy.InvitesDelete)),

        new PolicyDefinition("levels", "Уровни",
            create: nameof(Policy.LevelsCreate),
            read: nameof(Policy.LevelsRead),
            update: nameof(Policy.LevelsEdit),
            delete: nameof(Policy.LevelsDelete)),

        new PolicyDefinition("messages", "Сообщения",
            create: nameof(Policy.MessagesCreate),
            read: nameof(Policy.MessagesRead),
            update: nameof(Policy.MessagesEdit),
            delete: nameof(Policy.MessagesDelete)),

        new PolicyDefinition("roles", "Роли",
            create: nameof(Policy.RolesCreate),
            read: nameof(Policy.RolesRead),
            update: nameof(Policy.RolesUpdate),
            delete: nameof(Policy.RolesDelete)),

        new PolicyDefinition("tags", "Теги",
            create: nameof(Policy.TagsCreate),
            read: nameof(Policy.TagsRead),
            update: nameof(Policy.TagsEdit),
            delete: nameof(Policy.TagsDelete)),

        new PolicyDefinition("tips", "Подсказки",
            create: nameof(Policy.TipsCreate),
            read: nameof(Policy.TipsRead),
            update: nameof(Policy.TipsEdit),
            delete: nameof(Policy.TipsDelete)),

        new PolicyDefinition("users", "Пользователи",
            create: nameof(Policy.UsersCreate),
            read: nameof(Policy.UsersRead),
            update: nameof(Policy.UsersEdit),
            delete: nameof(Policy.UsersDelete)),

        // Toggle policies (non-CRUD, all in OtherPolicy)
        new PolicyDefinition("administration", "Администрирование",
            create: null, read: null, update: null, delete: null,
            otherKeys: new[] { nameof(OtherPolicy.Administration) }),

        new PolicyDefinition("userSessions", "Сессии пользователей",
            create: null, read: null, update: null, delete: null,
            otherKeys: new[] { nameof(OtherPolicy.UserSession) }),

        new PolicyDefinition("auditLog", "Журнал аудита",
            create: null, read: null, update: null, delete: null,
            otherKeys: new[] { nameof(OtherPolicy.UserAuditLog) }),

        new PolicyDefinition("settings", "Управление системой",
            create: null, read: null, update: null, delete: null,
            otherKeys: new[] { nameof(OtherPolicy.Settings) }),
    };
}

public class PolicyDefinition
{
    public string Key { get; }
    public string Name { get; }
    public bool IsCrud { get; }
    public string? CreateKey { get; }
    public string? ReadKey { get; }
    public string? UpdateKey { get; }
    public string? DeleteKey { get; }
    public string[] OtherKeys { get; }

    public PolicyDefinition(
        string key, string name,
        string? create, string? read, string? update, string? delete,
        string[]? otherKeys = null)
    {
        Key = key;
        Name = name;
        IsCrud = create != null || read != null || update != null || delete != null;
        CreateKey = create;
        ReadKey = read;
        UpdateKey = update;
        DeleteKey = delete;
        OtherKeys = otherKeys ?? Array.Empty<string>();
    }

    public IEnumerable<string> AllKeys()
    {
        if (CreateKey != null) yield return CreateKey;
        if (ReadKey != null) yield return ReadKey;
        if (UpdateKey != null) yield return UpdateKey;
        if (DeleteKey != null) yield return DeleteKey;
        foreach (var k in OtherKeys) yield return k;
    }
}
