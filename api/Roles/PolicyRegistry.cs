using Mouse.NET.Common;

namespace Mouse.NET.Roles;

public static class PolicyRegistry
{
    public static readonly PolicyDefinition[] All = new[]
    {
        // === Moder (права админ. панели) ===
        new PolicyDefinition("comments", "Комментарии", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.CommentsCreate), "создание"),
            new PolicyPermission(nameof(Policy.CommentsRead), "чтение"),
            new PolicyPermission(nameof(Policy.CommentsEdit), "ред."),
            new PolicyPermission(nameof(Policy.CommentsDelete), "удаление"),
        }),

        new PolicyDefinition("invites", "Приглашения", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.InvitesCreate), "создание"),
            new PolicyPermission(nameof(Policy.InvitesRead), "чтение"),
            new PolicyPermission(nameof(Policy.InvitesEdit), "ред."),
            new PolicyPermission(nameof(Policy.InvitesDelete), "удаление"),
        }),

        new PolicyDefinition("invitesSelf", "Приглашения", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.InvitesCreateSelf), "создание"),
            new PolicyPermission(nameof(Policy.InvitesEditSelf), "ред."),
            new PolicyPermission(nameof(Policy.InvitesDeleteSelf), "удаление"),
        }),

        new PolicyDefinition("levels", "Уровни", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.LevelsCreate), "создание"),
            new PolicyPermission(nameof(Policy.LevelsRead), "чтение"),
            new PolicyPermission(nameof(Policy.LevelsEdit), "ред."),
            new PolicyPermission(nameof(Policy.LevelsDelete), "удаление"),
        }),

        new PolicyDefinition("messages", "Сообщения", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.MessagesCreate), "создание"),
            new PolicyPermission(nameof(Policy.MessagesRead), "чтение"),
            new PolicyPermission(nameof(Policy.MessagesEdit), "ред."),
            new PolicyPermission(nameof(Policy.MessagesDelete), "удаление"),
        }),

        new PolicyDefinition("roles", "Роли", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.RolesCreate), "создание"),
            new PolicyPermission(nameof(Policy.RolesRead), "чтение"),
            new PolicyPermission(nameof(Policy.RolesUpdate), "ред."),
            new PolicyPermission(nameof(Policy.RolesDelete), "удаление"),
        }),

        new PolicyDefinition("tags", "Теги", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.TagsCreate), "создание"),
            new PolicyPermission(nameof(Policy.TagsRead), "чтение"),
            new PolicyPermission(nameof(Policy.TagsEdit), "ред."),
            new PolicyPermission(nameof(Policy.TagsDelete), "удаление"),
        }),

        new PolicyDefinition("tagsSelf", "Теги", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.TagsCreateSelf), "создание"),
            new PolicyPermission(nameof(Policy.TagsEditSelf), "ред."),
            new PolicyPermission(nameof(Policy.TagsDeleteSelf), "удаление"),
        }),

        new PolicyDefinition("tips", "Подсказки", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.TipsCreate), "создание"),
            new PolicyPermission(nameof(Policy.TipsRead), "чтение"),
            new PolicyPermission(nameof(Policy.TipsEdit), "ред."),
            new PolicyPermission(nameof(Policy.TipsDelete), "удаление"),
        }),

        new PolicyDefinition("users", "Пользователи", PolicyGroup.Moder, new[]
        {
            new PolicyPermission(nameof(Policy.UsersCreate), "создание"),
            new PolicyPermission(nameof(Policy.UsersRead), "чтение"),
            new PolicyPermission(nameof(Policy.UsersEdit), "ред."),
            new PolicyPermission(nameof(Policy.UsersDelete), "удаление"),
        }),

        new PolicyDefinition("commentsSelf", "Комментарии", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.CommentsCreateSelf), "создание"),
            new PolicyPermission(nameof(Policy.CommentsEditSelf), "ред."),
            new PolicyPermission(nameof(Policy.CommentsDeleteSelf), "удаление"),
        }),

        new PolicyDefinition("levelsSelf", "Уровни", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.LevelsCreateSelf), "создание"),
            new PolicyPermission(nameof(Policy.LevelsEditSelf), "ред."),
            new PolicyPermission(nameof(Policy.LevelsDeleteSelf), "удаление"),
        }),

        new PolicyDefinition("messagesSelf", "Сообщения", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.MessagesCreateSelf), "создание"),
            new PolicyPermission(nameof(Policy.MessagesEditSelf), "ред."),
            new PolicyPermission(nameof(Policy.MessagesDeleteSelf), "удаление"),
        }),

        new PolicyDefinition("tipsSelf", "Подсказки", PolicyGroup.Owner, new[]
        {
            new PolicyPermission(nameof(Policy.TipsCreateSelf), "создание"),
            new PolicyPermission(nameof(Policy.TipsEditSelf), "ред."),
            new PolicyPermission(nameof(Policy.TipsDeleteSelf), "удаление"),
        }),

        // === System (прочие права) ===
        new PolicyDefinition("administration", "Администрирование", PolicyGroup.System, new[]
        {
            new PolicyPermission(nameof(OtherPolicy.Administration), "доступ"),
        }),

        new PolicyDefinition("userSessions", "Сессии пользователей", PolicyGroup.System, new[]
        {
            new PolicyPermission(nameof(OtherPolicy.UserSession), "доступ"),
        }),

        new PolicyDefinition("auditLog", "Журнал аудита", PolicyGroup.System, new[]
        {
            new PolicyPermission(nameof(OtherPolicy.UserAuditLog), "доступ"),
        }),

        new PolicyDefinition("settings", "Управление системой", PolicyGroup.System, new[]
        {
            new PolicyPermission(nameof(OtherPolicy.Settings), "доступ"),
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
