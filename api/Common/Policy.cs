namespace Mouse.NET.Common;

public enum Policy
{
    // Levels - admin/any operations
    LevelsCreate,
    LevelsRead,
    LevelsEdit,
    LevelsDelete,
    // Levels - self/ownership operations
    LevelsEditSelf,
    LevelsDeleteSelf,

    // Tags - admin only (справочник)
    TagsCreate,
    TagsRead,
    TagsEdit,
    TagsDelete,

    // Tips - admin/any operations
    TipsCreate,
    TipsRead,
    TipsEdit,
    TipsDelete,
    // Tips - self/ownership operations
    TipsEditSelf,
    TipsDeleteSelf,

    // Comments - admin/any operations
    CommentsCreate,
    CommentsRead,
    CommentsEdit,
    CommentsDelete,
    // Comments - self/ownership operations
    CommentsEditSelf,
    CommentsDeleteSelf,

    // Messages - admin/any operations
    MessagesCreate,
    MessagesRead,
    MessagesEdit,
    MessagesDelete,
    // Messages - self/ownership operations
    MessagesEditSelf,
    MessagesDeleteSelf,

    // Invites - admin only
    InvitesCreate,
    InvitesRead,
    InvitesEdit,
    InvitesDelete,

    // Users - admin only (кроме read)
    UsersCreate,
    UsersRead,
    UsersEdit,
    UsersDelete,

    // Roles - admin only
    RolesRead,
    RolesCreate,
    RolesUpdate,
    RolesDelete,
}
