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
  mapId: number;
  body: {
    file: Blob;
  };
};
export type SetMapsTagApiResponse = /** status 200 OK */ Map;
export type SetMapsTagApiArg = {
  mapId?: number;
  tagIds?: number[];
};
export type UpdateTipApiResponse = /** status 200 OK */ Tip;
export type UpdateTipApiArg = {
  updateTipRequest: UpdateTipRequest;
};
export type AddFavoriteMapApiResponse = /** status 200 OK */ string;
export type AddFavoriteMapApiArg = {
  mapId: number;
};
export type AddCompletedMapApiResponse = /** status 200 OK */ string;
export type AddCompletedMapApiArg = {
  mapId: number;
  body: {
    file: Blob;
  };
};
export type CreateMapApiResponse = /** status 200 OK */ Map;
export type CreateMapApiArg = {
  createMapRequest: CreateMapRequest;
};
export type CreateTipApiResponse = /** status 200 OK */ Tip;
export type CreateTipApiArg = {
  createTipRequest: CreateTipRequest;
};
export type CreateCommentApiResponse = /** status 200 OK */ Comment;
export type CreateCommentApiArg = {
  createCommentRequest: CreateCommentRequest;
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
export type GetMapApiResponse = /** status 200 OK */ Map;
export type GetMapApiArg = {
  mapId: number;
};
export type GetFavoriteMapsByUserApiResponse = /** status 200 OK */ {
  records: Map[];
  pageNumber: number;
  pageSize: number;
  totalRecordsCount: number;
};
export type GetFavoriteMapsByUserApiArg = {
  userId?: number;
  page?: number;
  size?: number;
};
export type GetCompletedMapsByUserApiResponse = /** status 200 OK */ {
  records: Map[];
  pageNumber: number;
  pageSize: number;
  totalRecordsCount: number;
};
export type GetCompletedMapsByUserApiArg = {
  userId?: number;
  page?: number;
  size?: number;
};
export type GetMapsApiResponse = /** status 200 OK */ {
  records: Map[];
  pageNumber: number;
  pageSize: number;
  totalRecordsCount: number;
};
export type GetMapsApiArg = {
  page?: number;
  size?: number;
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
export type GetTipPaginateApiResponse = /** status 200 OK */ Tip[];
export type GetTipPaginateApiArg = void;
export type GetCommentsByUserIdApiResponse = /** status 200 OK */ Comment[];
export type GetCommentsByUserIdApiArg = {
  userId: number;
};
export type GetCommentsByMapIdApiResponse = /** status 200 OK */ Comment[];
export type GetCommentsByMapIdApiArg = {
  mapId: number;
};
export type RemoveFavoriteMapApiResponse = /** status 200 OK */ string;
export type RemoveFavoriteMapApiArg = {
  mapId: number;
};
export type RemoveCompletedMapApiResponse = /** status 200 OK */ string;
export type RemoveCompletedMapApiArg = {
  mapId: number;
};
export type DeleteMapApiResponse = /** status 200 OK */ string;
export type DeleteMapApiArg = {
  mapId: number;
};
export type RemoveTipApiResponse = /** status 200 OK */ string;
export type RemoveTipApiArg = {
  tipId: number;
};
export type Tag = {
  id?: number;
  description?: string;
  name?: string;
};
export type UpdateTagRequest = {
  tagId?: number;
  name?: string;
  description?: string;
};
export type CreateTagRequest = {
  name?: string;
  description?: string;
};
export type User = {
  id?: number;
  avatar?: string;
  username?: string;
};
export type Map = {
  id?: number;
  name?: string;
  description?: string;
  user?: User;
  image?: string;
  tags?: Tag[];
  createdUtcDate: string | null;
  modifiedUtcDate: string | null;
};
export type UpdateMapRequest = {
  id?: number;
  name?: string;
  description?: string;
};
export type Tip = {
  id?: number;
  title?: string;
  text?: string;
  user?: User;
};
export type UpdateTipRequest = {
  tipId?: number;
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
  mapId?: number;
};
