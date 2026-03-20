using Mouse.NET.Common;

namespace Mouse.NET.Roles;

public static class PolicyRegistry
{
    public static readonly PolicyDefinition[] All = new[]
    {
        // === Moder (права админ. панели) ===
        new PolicyDefinition("comments", "Комментарии", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.CommentsCreate), "create"),
            new PolicyPermission(nameof(Policy.CommentsRead), "read"),
            new PolicyPermission(nameof(Policy.CommentsEdit), "update"),
            new PolicyPermission(nameof(Policy.CommentsDelete), "delete"),
        }),

        new PolicyDefinition("invites", "Приглашения", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.InvitesCreate), "create"),
            new PolicyPermission(nameof(Policy.InvitesRead), "read"),
            new PolicyPermission(nameof(Policy.InvitesEdit), "update"),
            new PolicyPermission(nameof(Policy.InvitesDelete), "delete"),
        }),

        new PolicyDefinition("levels", "Уровни", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.LevelsCreate), "create"),
            new PolicyPermission(nameof(Policy.LevelsRead), "read"),
            new PolicyPermission(nameof(Policy.LevelsEdit), "update"),
            new PolicyPermission(nameof(Policy.LevelsDelete), "delete"),
        }),

        new PolicyDefinition("messages", "Сообщения", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.MessagesCreate), "create"),
            new PolicyPermission(nameof(Policy.MessagesRead), "read"),
            new PolicyPermission(nameof(Policy.MessagesEdit), "update"),
            new PolicyPermission(nameof(Policy.MessagesDelete), "delete"),
        }),

        new PolicyDefinition("roles", "Роли", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.RolesCreate), "create"),
            new PolicyPermission(nameof(Policy.RolesRead), "read"),
            new PolicyPermission(nameof(Policy.RolesUpdate), "update"),
            new PolicyPermission(nameof(Policy.RolesDelete), "delete"),
        }),

        new PolicyDefinition("tags", "Теги", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.TagsCreate), "create"),
            new PolicyPermission(nameof(Policy.TagsRead), "read"),
            new PolicyPermission(nameof(Policy.TagsEdit), "update"),
            new PolicyPermission(nameof(Policy.TagsDelete), "delete"),
        }),

        new PolicyDefinition("tips", "Подсказки", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.TipsCreate), "create"),
            new PolicyPermission(nameof(Policy.TipsRead), "read"),
            new PolicyPermission(nameof(Policy.TipsEdit), "update"),
            new PolicyPermission(nameof(Policy.TipsDelete), "delete"),
        }),

        new PolicyDefinition("users", "Пользователи", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.UsersCreate), "create"),
            new PolicyPermission(nameof(Policy.UsersRead), "read"),
            new PolicyPermission(nameof(Policy.UsersEdit), "update"),
            new PolicyPermission(nameof(Policy.UsersDelete), "delete"),
        }),

        // === Owner (права пользователей) ===
        new PolicyDefinition("commentsSelf", "Комментарии", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.CommentsEditSelf), "update"),
            new PolicyPermission(nameof(Policy.CommentsDeleteSelf), "delete"),
        }),

        new PolicyDefinition("levelsSelf", "Уровни", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.LevelsEditSelf), "update"),
            new PolicyPermission(nameof(Policy.LevelsDeleteSelf), "delete"),
        }),

        new PolicyDefinition("messagesSelf", "Сообщения", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.MessagesEditSelf), "update"),
            new PolicyPermission(nameof(Policy.MessagesDeleteSelf), "delete"),
        }),

        new PolicyDefinition("tipsSelf", "Подсказки", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.TipsEditSelf), "update"),
            new PolicyPermission(nameof(Policy.TipsDeleteSelf), "delete"),
        }),

        // === System (прочие права) ===
        new PolicyDefinition("administration", "Администрирование", PolicyGroup.System, new[]
        {
            new PolicyPermission(nameof(OtherPolicy.Administration), "access"),
        }),

        new PolicyDefinition("userSessions", "Сессии пользователей", PolicyGroup.System, new[]
        {
            new PolicyPermission(nameof(OtherPolicy.UserSession), "access"),
        }),

        new PolicyDefinition("auditLog", "Журнал аудита", PolicyGroup.System, new[]
        {
            new PolicyPermission(nameof(OtherPolicy.UserAuditLog), "access"),
        }),

        new PolicyDefinition("settings", "Управление системой", PolicyGroup.System, new[]
        {
            new PolicyPermission(nameof(OtherPolicy.Settings), "access"),
        }),
    };
}

public class PolicyPermission
{
    public string Key { get; }
    public string Label { get; }

    public PolicyPermission(string key, string label)
    {
        Key = key;
        Label = label;
    }
}

public enum PolicyGroup
{
    Moder,
    Owner,
    System,
}

public class PolicyDefinition
{
    public string Key { get; }
    public string Name { get; }
    public string Label { get; }
    public PolicyGroup Group { get; }
    public PolicyPermission[] Permissions { get; }

    public PolicyDefinition(string key, string name, PolicyGroup group, PolicyPermission[] permissions, string? label = null)
    {
        Key = key;
        Name = name;
        Group = group;
        Permissions = permissions;
        Label = label ?? (permissions.Length > 1 ? "crud" : "other");
    }

    public IEnumerable<string> AllKeys() => Permissions.Select(p => p.Key);
}
