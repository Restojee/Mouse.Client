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
    LevelsCreateSelf,

    // Tags - admin only (справочник)
    TagsCreate,
    TagsRead,
    TagsEdit,
    TagsDelete,
    // Tags - self/ownership operations
    TagsEditSelf,
    TagsDeleteSelf,
    TagsCreateSelf,

    // Tips - admin/any operations
    TipsCreate,
    TipsRead,
    TipsEdit,
    TipsDelete,
    // Tips - self/ownership operations
    TipsEditSelf,
    TipsDeleteSelf,
    TipsCreateSelf,

    // Comments - admin/any operations
    CommentsCreate,
    CommentsRead,
    CommentsEdit,
    CommentsDelete,
    // Comments - self/ownership operations
    CommentsEditSelf,
    CommentsDeleteSelf,
    CommentsCreateSelf,

    // Messages - admin/any operations
    MessagesCreate,
    MessagesRead,
    MessagesEdit,
    MessagesDelete,
    // Messages - self/ownership operations
    MessagesEditSelf,
    MessagesDeleteSelf,
    MessagesCreateSelf,

    // Invites - admin only
    InvitesCreate,
    InvitesRead,
    InvitesEdit,
    InvitesDelete,
    // Invites - self/ownership operations
    InvitesEditSelf,
    InvitesDeleteSelf,
    InvitesCreateSelf,

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
    
    // Levels - admin/any operations
    FavoriteCreate,
    FavoriteRead,
    FavoriteEdit,
    FavoriteDelete,
    // Favorite - self/ownership operations
    FavoriteEditSelf,
    FavoriteDeleteSelf,
    FavoriteCreateSelf,
    
    CompletedCreate,
    CompletedRead,
    CompletedEdit,
    CompletedDelete,
    // Completed - self/ownership operations
    CompletedEditSelf,
    CompletedDeleteSelf,
    CompletedCreateSelf,
    
    NoteCreate,
    NoteRead,
    NoteEdit,
    NoteDelete,
    // Note - self/ownership operations
    NoteEditSelf,
    NoteDeleteSelf,
    NoteCreateSelf,
    
    LevelTagCreate,
    LevelTagRead,
    LevelTagEdit,
    LevelTagDelete,
    // LevelTag - self/ownership operations
    LevelTagEditSelf,
    LevelTagDeleteSelf,
    LevelTagCreateSelf,
}
