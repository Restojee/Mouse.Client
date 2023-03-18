import { coreMapsApi as api } from "../coreMapsApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<GetTagsApiResponse, GetTagsApiArg>({
      query: () => ({ url: `/tags` }),
    }),
    updateTag: build.mutation<UpdateTagApiResponse, UpdateTagApiArg>({
      query: (queryArg) => ({
        url: `/tags`,
        method: "PUT",
        body: queryArg.updateTagRequest,
      }),
    }),
    createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
      query: (queryArg) => ({
        url: `/tags`,
        method: "POST",
        body: queryArg.createTagRequest,
      }),
    }),
    updateMap: build.mutation<UpdateMapApiResponse, UpdateMapApiArg>({
      query: (queryArg) => ({
        url: `/maps/update`,
        method: "PUT",
        body: queryArg.updateMapRequest,
      }),
    }),
    updateMapImage: build.mutation<
        UpdateMapImageApiResponse,
        UpdateMapImageApiArg
        >({
      query: (queryArg) => ({
        url: `/maps/update-image/${queryArg.mapId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    setMapTags: build.mutation<SetMapTagsApiResponse, SetMapTagsApiArg>({
      query: (queryArg) => ({
        url: `/maps/set-tags`,
        method: "PUT",
        params: { mapId: queryArg.mapId, tagIds: queryArg.tagIds },
      }),
    }),
    updateTip: build.mutation<UpdateTipApiResponse, UpdateTipApiArg>({
      query: (queryArg) => ({
        url: `/info/update`,
        method: "PUT",
        body: queryArg.updateTipRequest,
      }),
    }),
    addFavoriteMap: build.mutation<
        AddFavoriteMapApiResponse,
        AddFavoriteMapApiArg
        >({
      query: (queryArg) => ({
        url: `/maps/${queryArg.mapId}/favorites/create`,
        method: "POST",
      }),
    }),
    addCompletedMap: build.mutation<
        AddCompletedMapApiResponse,
        AddCompletedMapApiArg
        >({
      query: (queryArg) => ({
        url: `/maps/${queryArg.mapId}/completed/create`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    createMap: build.mutation<CreateMapApiResponse, CreateMapApiArg>({
      query: (queryArg) => ({
        url: `/maps/create`,
        method: "POST",
        body: queryArg.createMapRequest,
      }),
    }),
    createTip: build.mutation<CreateTipApiResponse, CreateTipApiArg>({
      query: (queryArg) => ({
        url: `/info/create`,
        method: "POST",
        body: queryArg.createTipRequest,
      }),
    }),
    createComment: build.mutation<
        CreateCommentApiResponse,
        CreateCommentApiArg
        >({
      query: (queryArg) => ({
        url: `/comments`,
        method: "POST",
        body: queryArg.createCommentRequest,
      }),
    }),
    getCurrentUser: build.query<
        GetCurrentUserApiResponse,
        GetCurrentUserApiArg
        >({
      query: () => ({ url: `/users/current` }),
    }),
    getTag: build.query<GetTagApiResponse, GetTagApiArg>({
      query: (queryArg) => ({ url: `/tags/${queryArg.tagId}` }),
    }),
    deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
      query: (queryArg) => ({
        url: `/tags/${queryArg.tagId}`,
        method: "DELETE",
      }),
    }),
    getMap: build.query<GetMapApiResponse, GetMapApiArg>({
      query: (queryArg) => ({ url: `/maps/one/by-id/${queryArg.mapId}` }),
    }),
    getFavoriteMapsByUser: build.query<
        GetFavoriteMapsByUserApiResponse,
        GetFavoriteMapsByUserApiArg
        >({
      query: (queryArg) => ({
        url: `/maps/favorites/collect/by-user`,
        params: {
          userId: queryArg.userId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getCompletedMapsByUser: build.query<
        GetCompletedMapsByUserApiResponse,
        GetCompletedMapsByUserApiArg
        >({
      query: (queryArg) => ({
        url: `/maps/completed/collect/by-user`,
        params: {
          userId: queryArg.userId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getMaps: build.query<GetMapsApiResponse, GetMapsApiArg>({
      query: (queryArg) => ({
        url: `/maps/collect`,
        params: { page: queryArg.page, size: queryArg.size },
      }),
    }),
    getMapsByUser: build.query<GetMapsByUserApiResponse, GetMapsByUserApiArg>({
      query: (queryArg) => ({
        url: `/maps/collect/by-user`,
        params: {
          userId: queryArg.userId,
          page: queryArg.page,
          size: queryArg.size,
        },
      }),
    }),
    getTipPaginate: build.query<
        GetTipPaginateApiResponse,
        GetTipPaginateApiArg
        >({
      query: () => ({ url: `/info/collect` }),
    }),
    getCommentsByUserId: build.query<
        GetCommentsByUserIdApiResponse,
        GetCommentsByUserIdApiArg
        >({
      query: (queryArg) => ({ url: `/comments/by-user/${queryArg.userId}` }),
    }),
    getCommentsByMapId: build.query<
        GetCommentsByMapIdApiResponse,
        GetCommentsByMapIdApiArg
        >({
      query: (queryArg) => ({ url: `/comments/by-map/${queryArg.mapId}` }),
    }),
    removeFavoriteMap: build.mutation<
        RemoveFavoriteMapApiResponse,
        RemoveFavoriteMapApiArg
        >({
      query: (queryArg) => ({
        url: `/maps/${queryArg.mapId}/favorites/remove`,
        method: "DELETE",
      }),
    }),
    removeCompletedMap: build.mutation<
        RemoveCompletedMapApiResponse,
        RemoveCompletedMapApiArg
        >({
      query: (queryArg) => ({
        url: `/maps/${queryArg.mapId}/completed/remove`,
        method: "DELETE",
      }),
    }),
    deleteMap: build.mutation<DeleteMapApiResponse, DeleteMapApiArg>({
      query: (queryArg) => ({
        url: `/maps/remove`,
        method: "DELETE",
        params: { mapId: queryArg.mapId },
      }),
    }),
    removeTip: build.mutation<RemoveTipApiResponse, RemoveTipApiArg>({
      query: (queryArg) => ({
        url: `/info/remove/${queryArg.tipId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as genMouseMapsApi };
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
export type SetMapTagsApiResponse = /** status 200 OK */ Map;
export type SetMapTagsApiArg = {
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
export type GetFavoriteMapsByUserApiResponse = /** status 200 OK */ Map[];
export type GetFavoriteMapsByUserApiArg = {
  userId?: number;
  page?: number;
  size?: number;
};
export type GetCompletedMapsByUserApiResponse = /** status 200 OK */ Map[];
export type GetCompletedMapsByUserApiArg = {
  userId?: number;
  page?: number;
  size?: number;
};
export type GetMapsApiResponse = /** status 200 OK */ Map[];
export type GetMapsApiArg = {
  page?: number;
  size?: number;
};
export type GetMapsByUserApiResponse = /** status 200 OK */ Map[];
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
};
export type CreateCommentRequest = {
  text?: string;
  mapId?: number;
};
