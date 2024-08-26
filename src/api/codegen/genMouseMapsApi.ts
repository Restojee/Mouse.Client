export type GetTagsApiResponse = /** status 200 OK */ Tag[];
export type GetTagsApiArg = void;
export type UpdateTagApiResponse = /** status 200 OK */ Tag;
export type UpdateTagApiArg = {
    updateTagRequest: UpdateTagRequest;
};
export type CreateTagApiResponse = /** status 200 OK */ Tag;
export type CreateTagApiArg = {
    createTagRequest: CreateTagRequest;
};
export type UpdateMapApiResponse = /** status 200 OK */ Map;
export type UpdateMapApiArg = {
    updateMapRequest: UpdateMapRequest;
};
export type UpdateMapImageApiResponse = /** status 200 OK */ Map;
export type UpdateMapImageApiArg = {
    levelId: number;
    body: {
        file: Blob;
    };
};
export type SetMapsTagApiResponse = /** status 200 OK */ Map;
export type SetMapsTagApiArg = {
    levelId?: number;
    tagIds?: number[];
};
export type UpdateTipApiResponse = /** status 200 OK */ Tip;
export type UpdateTipApiArg = UpdateTipRequest;
export type AddFavoriteMapApiResponse = /** status 200 OK */ string;
export type AddFavoriteMapApiArg = {
    levelId: number;
};
export type AddCompletedMapApiResponse = /** status 200 OK */ string;
export type AddCompletedMapApiArg = {
    levelId: number;
    body: {
        file: Blob;
    };
};
export type CreateMapApiResponse = /** status 200 OK */ Map;
export type CreateMapApiArg = {
    createMapRequest: CreateMapRequest;
};
export type CreateTipApiResponse = /** status 200 OK */ Tip;
export type CreateTipApiArg = CreateTipRequest;
export type CreateCommentApiResponse = /** status 200 OK */ Comment;
export type CreateCommentApiArg = {
    createCommentRequest: CreateCommentRequest;
};
export type GetUsersApiResponse = /** status 200 OK */ {
    page: number;
    records: User[];
    totalItems: number;
    pageSize: number;
    totalPages: number;
};
export type GetUsersApiArg = {
    page?: number;
    size?: number;
};
export type GetCurrentUserApiResponse = /** status 200 OK */ User;
export type GetCurrentUserApiArg = void;
export type GetTagApiResponse = /** status 200 OK */ Tag;
export type GetTagApiArg = {
    tagId: number;
};
export type DeleteTagApiResponse = /** status 200 OK */ string;
export type DeleteTagApiArg = {
    tagId: number;
};
export type GetMapApiResponse = /** status 200 OK */ MapById;
export type GetMapApiArg = {
    levelId: number;
};
export type GetCompletedMapsByMapApiArg = {
    levelId?: number;
};
export type GetCompletedMapsByMapApiResponse = /** status 200 OK */ MapCompleted[];
export type GetMapsApiResponse = /** status 200 OK */ {
    records: Map[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
};
export type GetMapsApiArg = {
    page: number;
    size: number;
    sortDirection?: 'ASC' | 'DESC';
    sortBy?: 'DATE' | 'COMPLETED' | 'COMMENTED' | 'FAVORITE' | 'VISIT';
    isFavorite?: boolean;
    hasNote?: boolean;
    isCompleted?: boolean;
    isCreatedByUser?: boolean;
    name?: string;
    userId?: User['id'];
    tagIds?: Tag['id'][]
};
export type GetMapsByUserApiResponse = /** status 200 OK */ {
    records: Map[];
    pageNumber: number;
    pageSize: number;
    totalRecordsCount: number;
};
export type GetMapsByUserApiArg = {
    userId?: number;
    page?: number;
    size?: number;
};
export type GetTipApiResponse = /** status 200 OK */ {
    records: Tip[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
};
export type GetTipPaginateApiArg = {
    size: number;
    page: number;
};
export type GetCommentsByUserIdApiResponse = /** status 200 OK */ Comment[];
export type GetCommentsByUserIdApiArg = {
    userId: number;
};
export type GetCommentsByMapIdApiResponse = /** status 200 OK */ Comment[];
export type GetCommentsByMapIdApiArg = {
    levelId: number;
};
export type RemoveFavoriteMapApiResponse = /** status 200 OK */ string;
export type RemoveFavoriteMapApiArg = {
    levelId: number;
};
export type RemoveCompletedMapApiResponse = /** status 200 OK */ string;
export type RemoveCompletedMapApiArg = {
    levelId: number;
};
export type DeleteMapApiResponse = /** status 200 OK */ string;
export type DeleteMapApiArg = {
    levelId: number;
};
export type RemoveTipApiResponse = /** status 200 OK */ string;
export type RemoveTipApiArg = {
    tipId: number;
};
export type Tag = {
    id?: number;
    description?: string;
    name: string;
};
export type UpdateTagRequest = {
    id?: number;
    name?: string;
    description?: string;
};
export type CreateTagRequest = {
    name?: string;
    description?: string;
};
export type User = {
    id?: number;
    createdUtcDate?: string,
    modifiedUtcDate?: string,
    avatar?: string;
    username?: string;
    levelsCount?: number;
    completedCount?: number;
    commentsCount?: number;
    favoritesCount?: number;
};
export type MapCompleted = {
    user: User;
    image: Map['image'];
    createdUtcDate: Map['createdUtcDate'];
    modifiedUtcDate: Map['modifiedUtcDate']
}
export type MapById = {
    id?: number;
    name?: string;
    description?: string;
    user?: User;
    image?: string;
    tags?: Tag[];
    createdUtcDate: string | null;
    modifiedUtcDate: string | null;
    notes: Note[];
    completed?: MapCompleted[];
    commentsCount: number;
    completedCount: number;
    favoritesCount: number;
    visitsCount: number;
    isCompletedByUser: boolean;
    isFavoriteByUser: boolean;
}
export type Map = {
    id?: number;
    name?: string;
    description?: string;
    user?: User;
    image?: string;
    tags?: Tag[];
    createdUtcDate: string | null;
    modifiedUtcDate: string | null;
    notes: Note[];
    commentsCount: number;
    completedCount: number;
    favoritesCount: number;
    visitsCount: number;
    isCompletedByUser: boolean;
    isFavoriteByUser: boolean;
};
export type Note = {
    createdUtcDate: string;
    modifiedUtcDate: string;
    id: number;
    levelId: Map['id'];
    user: User;
    text: string;
}
export type UpdateMapRequest = {
    id?: number;
    name?: string;
    description?: string;
};
export type Tip = {
    id?: number;
    user?: User;
    title?: string;
    text?: string;
    createdUtcDate: string | null;
    modifiedUtcDate: string | null;
};
export type UpdateTipRequest = {
    id?: number;
    title?: string;
    text?: string;
};
export type CreateMapRequest = {
    name?: string;
    description?: string;
};
export type CreateTipRequest = {
    title?: string;
    text?: string;
};
export type Comment = {
    id?: number;
    text?: string;
    user?: User;
    createdUtcDate: string | null;
    modifiedUtcDate: string | null;
};
export type CreateCommentRequest = {
    text?: string;
    levelId?: number;
};
export type LoginRequest = {
    userName: string;
    password: string;
}
export type LoginResponse = {
    accessToken: string,
    refreshToken: string,
    user: User;
}
export type UpdateUserImageRequest = {
    file: Blob;
}
export type RegisterRequest = {
    userName: string;
    password: string;
    inviteToken: string;
}
export type RegisterResponse = {
    accessToken: string;
    refreshToken: string;
    user: User;
}
export type GetChatMessagesResponse = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    records: Comment[];
}
export type GetChatMessagesRequest = {
    size: number;
    page: number;
}
export type CreateChatMessageRequest = {
    text: string;
}
export type CreateChatMessageResponse = Comment
export type UpdateMapNoteRequest = {
    levelId: number;
    text: string;
}
export type UpdateMapNoteResponse = Map;
export type GetInviteCollectResponse = {
    createdUtcDate: string;
    modifiedUtcDate: string;
    token: string;
    expirationDate: string;
}
