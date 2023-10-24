import { AxiosResponse } from 'axios';
import api from '@/api/coreMapsApi';
import * as apiTypes from '@/api/codegen/genMouseMapsApi';
import queryString from 'query-string';

export const mapsApi = {
    getMaps: async (params: apiTypes.GetMapsApiArg) => {
        let query = queryString.stringify(params)

        const res = await api.get<apiTypes.GetMapsApiArg, AxiosResponse<apiTypes.GetMapsApiResponse>>(`/maps/collect/by-filter?${query}`);
        return res.data;
    },
    getMapsById: async (params: apiTypes.GetMapApiArg, signal?: AbortSignal) => {
        const res = await api.get<apiTypes.GetMapApiArg, AxiosResponse<apiTypes.GetMapApiResponse>>(`/maps/one/by-id/${params.mapId}`, { signal });
        return res.data;
    },
    createMap: async (body: apiTypes.CreateMapRequest) => {
        const res = await api.post<apiTypes.CreateMapRequest, AxiosResponse<apiTypes.CreateMapApiResponse>>('/maps/create', body);
        return res.data;
    },
    updateMapImage: async (arg: apiTypes.UpdateMapImageApiArg) => {
        const formData = new FormData();
        formData.append('file', arg.body.file, 'filename.png');

        const res = await api.put<apiTypes.UpdateMapImageApiArg, AxiosResponse<apiTypes.UpdateMapImageApiResponse>>(
            `/maps/update-image/${arg.mapId}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        return res.data;
    },
    deleteMap: async (params: apiTypes.DeleteMapApiArg) => {
        const res = await api.delete<apiTypes.DeleteMapApiArg, AxiosResponse<apiTypes.DeleteMapApiResponse>>(`/maps/remove`, { params });
        return res.data;
    },
    setMapsTag: async (body: apiTypes.SetMapsTagApiArg) => {
        const query = queryString.stringify({ tagIds: body.tagIds, mapId: body.mapId });

        const res = await api.put<apiTypes.SetMapsTagApiArg, AxiosResponse<apiTypes.SetMapsTagApiResponse>>('/maps/set-tags', query);
        return res.data;
    },
    getCompletedByMapId: async (params: apiTypes.GetCompletedMapsByMapApiArg) => {
        const res = await api.get<apiTypes.GetCompletedMapsByMapApiArg, AxiosResponse<apiTypes.GetCompletedMapsByMapApiResponse>>(`/maps/completed/collect/by-map`, { params });
        return res.data;
    },
    addCompletedMap: async (arg: apiTypes.AddCompletedMapApiArg) => {
        const formData = new FormData();
        formData.append('file', arg.body.file, 'filename.png');

        const res = await api.post<apiTypes.AddCompletedMapApiArg, AxiosResponse<apiTypes.AddCompletedMapApiResponse>>(
            `/maps/${arg.mapId}/completed/create`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        return res.data;
    },
    removeCompletedMap: async (params: apiTypes.RemoveCompletedMapApiArg) => {
        const res = await api.delete<apiTypes.RemoveCompletedMapApiArg, AxiosResponse<apiTypes.RemoveCompletedMapApiResponse>>(`/maps/${params.mapId}/completed/remove`);
        return res.data;
    },
    addFavorite: async (params: apiTypes.AddFavoriteMapApiArg) => {
        const res = await api.post<apiTypes.AddFavoriteMapApiArg, AxiosResponse<apiTypes.AddFavoriteMapApiResponse>>(`/maps/${params.mapId}/favorites/create`);
        return res.data;
    },
    removeFavorite: async (params: apiTypes.RemoveFavoriteMapApiArg) => {
        const res = await api.delete<apiTypes.RemoveFavoriteMapApiArg, AxiosResponse<apiTypes.RemoveFavoriteMapApiResponse>>(`/maps/${params.mapId}/favorites/remove`);
        return res.data;
    },
};

