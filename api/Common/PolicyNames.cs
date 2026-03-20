namespace Mouse.NET.Common;

public static class PolicyNames
{
    public const string AnyAuthenticated = "AnyAuthenticated";

    public const string System = nameof(System);

    public const string Administration = nameof(Administration);

    public const string LevelsCreate = nameof(LevelsCreate);
    public const string LevelsRead = nameof(LevelsRead);
    public const string LevelsEdit = nameof(LevelsEdit);
    public const string LevelsDelete = nameof(LevelsDelete);

    public const string TagsCreate = nameof(TagsCreate);
    public const string TagsRead = nameof(TagsRead);
    public const string TagsEdit = nameof(TagsEdit);
    public const string TagsDelete = nameof(TagsDelete);

    public const string TipsCreate = nameof(TipsCreate);
    public const string TipsRead = nameof(TipsRead);
    public const string TipsEdit = nameof(TipsEdit);
    public const string TipsDelete = nameof(TipsDelete);

    public const string CommentsCreate = nameof(CommentsCreate);
    public const string CommentsRead = nameof(CommentsRead);
    public const string CommentsEdit = nameof(CommentsEdit);
    public const string CommentsDelete = nameof(CommentsDelete);

    public const string MessagesCreate = nameof(MessagesCreate);
    public const string MessagesRead = nameof(MessagesRead);
    public const string MessagesEdit = nameof(MessagesEdit);
    public const string MessagesDelete = nameof(MessagesDelete);

    public const string InvitesCreate = nameof(InvitesCreate);
    public const string InvitesRead = nameof(InvitesRead);
    public const string InvitesEdit = nameof(InvitesEdit);
    public const string InvitesDelete = nameof(InvitesDelete);

    public const string UsersCreate = nameof(UsersCreate);
    public const string UsersRead = nameof(UsersRead);
    public const string UsersEdit = nameof(UsersEdit);
    public const string UsersDelete = nameof(UsersDelete);

    public const string RolesRead = nameof(RolesRead);
    public const string RolesCreate = nameof(RolesCreate);
    public const string RolesUpdate = nameof(RolesUpdate);
    public const string RolesDelete = nameof(RolesDelete);

    public const string UserSessionsRead = nameof(UserSessionsRead);
    public const string UserSessionsDelete = nameof(UserSessionsDelete);
}

public static class PolicyToPermission
{
    public static string GetRequiredPermission(string policyName)
    {
        return policyName switch
        {
            nameof(PolicyNames.Administration) => Permissions.Administration,
            nameof(PolicyNames.LevelsCreate) => Permissions.LevelsCreate,
            nameof(PolicyNames.LevelsRead) => Permissions.LevelsRead,
            nameof(PolicyNames.LevelsEdit) => Permissions.LevelsEdit,
            nameof(PolicyNames.LevelsDelete) => Permissions.LevelsDelete,
            nameof(PolicyNames.TagsCreate) => Permissions.TagsCreate,
            nameof(PolicyNames.TagsRead) => Permissions.TagsRead,
            nameof(PolicyNames.TagsEdit) => Permissions.TagsEdit,
            nameof(PolicyNames.TagsDelete) => Permissions.TagsDelete,
            nameof(PolicyNames.TipsCreate) => Permissions.TipsCreate,
            nameof(PolicyNames.TipsRead) => Permissions.TipsRead,
            nameof(PolicyNames.TipsEdit) => Permissions.TipsEdit,
            nameof(PolicyNames.TipsDelete) => Permissions.TipsDelete,
            nameof(PolicyNames.CommentsCreate) => Permissions.CommentsCreate,
            nameof(PolicyNames.CommentsRead) => Permissions.CommentsRead,
            nameof(PolicyNames.CommentsEdit) => Permissions.CommentsEdit,
            nameof(PolicyNames.CommentsDelete) => Permissions.CommentsDelete,
            nameof(PolicyNames.MessagesCreate) => Permissions.MessagesCreate,
            nameof(PolicyNames.MessagesRead) => Permissions.MessagesRead,
            nameof(PolicyNames.MessagesEdit) => Permissions.MessagesEdit,
            nameof(PolicyNames.MessagesDelete) => Permissions.MessagesDelete,
            nameof(PolicyNames.InvitesCreate) => Permissions.InvitesCreate,
            nameof(PolicyNames.InvitesRead) => Permissions.InvitesRead,
            nameof(PolicyNames.InvitesEdit) => Permissions.InvitesEdit,
            nameof(PolicyNames.InvitesDelete) => Permissions.InvitesDelete,
            nameof(PolicyNames.UsersCreate) => Permissions.UsersCreate,
            nameof(PolicyNames.UsersRead) => Permissions.UsersRead,
            nameof(PolicyNames.UsersEdit) => Permissions.UsersEdit,
            nameof(PolicyNames.UsersDelete) => Permissions.UsersDelete,
            nameof(PolicyNames.RolesRead) => Permissions.RolesRead,
            nameof(PolicyNames.RolesCreate) => Permissions.RolesCreate,
            nameof(PolicyNames.RolesUpdate) => Permissions.RolesUpdate,
            nameof(PolicyNames.RolesDelete) => Permissions.RolesDelete,
            nameof(PolicyNames.UserSessionsRead) => Permissions.UserSessionsRead,
            nameof(PolicyNames.UserSessionsDelete) => Permissions.UserSessionsDelete,
            _ => throw new InvalidOperationException($"Unknown policy: {policyName}")
        };
    }
}
