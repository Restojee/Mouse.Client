import { AxiosResponse } from 'axios';
import api from '@/api/coreMapsApi';
import {
    AddCompletedMapApiArg,
    AddCompletedMapApiResponse,
    AddFavoriteMapApiArg,
    AddFavoriteMapApiResponse,
    CreateMapApiResponse,
    CreateMapRequest,
    DeleteMapApiArg,
    DeleteMapApiResponse,
    GetCompletedMapsByMapApiArg,
    GetCompletedMapsByMapApiResponse,
    GetCompletedMapsByUserApiArg,
    GetCompletedMapsByUserApiResponse,
    GetFavoriteMapsByUserApiArg,
    GetFavoriteMapsByUserApiResponse,
    GetMapApiArg,
    GetMapApiResponse,
    GetMapsApiArg, GetMapsApiResponse,
    RemoveCompletedMapApiArg,
    RemoveCompletedMapApiResponse,
    RemoveFavoriteMapApiArg,
    RemoveFavoriteMapApiResponse,
    SetMapsTagApiArg,
    SetMapsTagApiResponse,
    UpdateMapImageApiArg,
    UpdateMapImageApiResponse,
} from '@/api/codegen/genMouseMapsApi';
import queryString from 'query-string';

export const mapsApi = {
    getMaps: async (params: GetMapsApiArg) => {
        const res = await api.get<GetMapsApiArg, AxiosResponse<GetMapsApiResponse>>('/maps/collect', { params });
        return res.data;
    },
    getMapsById: async (params: GetMapApiArg, signal?: AbortSignal) => {
        const res = await api.get<GetMapApiArg, AxiosResponse<GetMapApiResponse>>(`/maps/one/by-id/${params.mapId}`, {signal});
        return res.data;
    },
    createMap: async (body: CreateMapRequest) => {
        const res = await api.post<CreateMapRequest, AxiosResponse<CreateMapApiResponse>>('/maps/create', body);
        return res.data;
    },
    updateMapImage: async (arg: UpdateMapImageApiArg) => {
        const formData = new FormData();
        formData.append('file', arg.body.file, 'filename.png');

        const res = await api.put<UpdateMapImageApiArg, AxiosResponse<UpdateMapImageApiResponse>>(
            `/maps/update-image/${arg.mapId}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        return res.data;
    },
    deleteMap: async (params: DeleteMapApiArg) => {
        const res = await api.delete<DeleteMapApiArg, AxiosResponse<DeleteMapApiResponse>>(`/maps/remove`, { params });
        return res.data;
    },
    setMapsTag: async (body: SetMapsTagApiArg) => {
        const query = queryString.stringify({tagIds: body.tagIds, mapId: body.mapId})

        const res = await api.put<SetMapsTagApiArg, AxiosResponse<SetMapsTagApiResponse>>('/maps/set-tags', query);
        return res.data;
    },
    getCompletedByMapId: async (params: GetCompletedMapsByMapApiArg) => {
        const res = await api.get<GetCompletedMapsByMapApiArg, AxiosResponse<GetCompletedMapsByMapApiResponse>>(`/maps/completed/collect/by-map`, { params });
        return res.data;
    },
    addCompletedMap: async (arg: AddCompletedMapApiArg) => {
        const formData = new FormData();
        formData.append('file', arg.body.file, 'filename.png');

        const res = await api.post<AddCompletedMapApiArg, AxiosResponse<AddCompletedMapApiResponse>>(
            `/maps/${arg.mapId}/completed/create`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        return res.data;
    },
    getCompletedByUserId: async (params: GetCompletedMapsByUserApiArg) => {
        const res = await api.get<GetCompletedMapsByUserApiArg, AxiosResponse<GetCompletedMapsByUserApiResponse>>(`/maps/completed/collect/by-user`, { params });
        return res.data;
    },
    removeCompletedMap: async (params: RemoveCompletedMapApiArg) => {
        const res = await api.delete<RemoveCompletedMapApiArg, AxiosResponse<RemoveCompletedMapApiResponse>>(`/maps/${params.mapId}/completed/remove`);
        return res.data;
    },
    getFavorites: async (params: GetFavoriteMapsByUserApiArg) => {
        const res = await api.get<GetFavoriteMapsByUserApiArg, AxiosResponse<GetFavoriteMapsByUserApiResponse>>(`/maps/favorites/collect/by-user`, { params });
        return res.data;
    },
    addFavorite: async (params: AddFavoriteMapApiArg) => {
        const res = await api.post<AddFavoriteMapApiArg, AxiosResponse<AddFavoriteMapApiResponse>>(`/maps/${params.mapId}/favorites/create`);
        return res.data;
    },
    removeFavorite: async (params: RemoveFavoriteMapApiArg) => {
        const res = await api.delete<RemoveFavoriteMapApiArg, AxiosResponse<RemoveFavoriteMapApiResponse>>(`/maps/${params.mapId}/favorites/remove`);
        return res.data;
    },
};

