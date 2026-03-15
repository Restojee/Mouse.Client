namespace Mouse.NET.Common;

public static class Permissions
{
    public const string ClaimType = "perm";

    public const string Administration = "administration";

    public const string LevelsCreate = "levels.create";
    public const string LevelsRead = "levels.read";
    public const string LevelsEdit = "levels.edit";
    public const string LevelsDelete = "levels.delete";
    public const string LevelsWrite = "levels.write";

    public const string TagsCreate = "tags.create";
    public const string TagsRead = "tags.read";
    public const string TagsEdit = "tags.edit";
    public const string TagsDelete = "tags.delete";
    public const string TagsWrite = "tags.write";

    public const string TipsCreate = "tips.create";
    public const string TipsRead = "tips.read";
    public const string TipsEdit = "tips.edit";
    public const string TipsDelete = "tips.delete";
    public const string TipsWrite = "tips.write";

    public const string CommentsCreate = "comments.create";
    public const string CommentsRead = "comments.read";
    public const string CommentsEdit = "comments.edit";
    public const string CommentsDelete = "comments.delete";
    public const string CommentsWrite = "comments.write";

    public const string MessagesCreate = "messages.create";
    public const string MessagesRead = "messages.read";
    public const string MessagesEdit = "messages.edit";
    public const string MessagesDelete = "messages.delete";
    public const string MessagesWrite = "messages.write";

    public const string InvitesCreate = "invites.create";
    public const string InvitesRead = "invites.read";
    public const string InvitesEdit = "invites.edit";
    public const string InvitesDelete = "invites.delete";
    public const string InvitesWrite = "invites.write";

    public const string UsersCreate = "users.create";
    public const string UsersRead = "users.read";
    public const string UsersEdit = "users.edit";
    public const string UsersDelete = "users.delete";
    public const string UsersWrite = "users.write";

    public const string RolesRead = "roles.read";
    public const string RolesCreate = "roles.create";
    public const string RolesUpdate = "roles.update";
    public const string RolesDelete = "roles.delete";
    public const string RolesAll = "roles.all";

    public const string UserSessionsRead = "user_sessions.read";
    public const string UserSessionsWrite = "user_sessions.write";
    public const string UserSessionsDelete = "user_sessions.delete";

    public static readonly string[] All =
    {
        Administration,
        LevelsCreate, LevelsRead, LevelsEdit, LevelsDelete, LevelsWrite,
        TagsCreate, TagsRead, TagsEdit, TagsDelete, TagsWrite,
        TipsCreate, TipsRead, TipsEdit, TipsDelete, TipsWrite,
        CommentsCreate, CommentsRead, CommentsEdit, CommentsDelete, CommentsWrite,
        MessagesCreate, MessagesRead, MessagesEdit, MessagesDelete, MessagesWrite,
        InvitesCreate, InvitesRead, InvitesEdit, InvitesDelete, InvitesWrite,
        UsersCreate, UsersRead, UsersEdit, UsersDelete, UsersWrite,
        RolesRead, RolesCreate, RolesUpdate, RolesDelete, RolesAll,
        UserSessionsRead, UserSessionsWrite, UserSessionsDelete,
    };
}
