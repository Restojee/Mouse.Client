import { capitalizeKeys } from '@/modules/map/containers/map-list/utils';
import { AxiosResponse } from 'axios';
import api from '@/api/coreMapsApi';
import * as apiTypes from '@/api/codegen/genMouseMapsApi';
import queryString from 'query-string';

export const mapsApi = {
    getMaps: async (params: apiTypes.GetMapsApiArg) => {
        let query = queryString.stringify(capitalizeKeys(params));

        const res = await api.get<apiTypes.GetMapsApiArg, AxiosResponse<apiTypes.GetMapsApiResponse>>(`/levels/collect?${query}`);
        return res.data;
    },
    getMapsById: async (params: apiTypes.GetMapApiArg, signal?: AbortSignal) => {
        const res = await api.get<apiTypes.GetMapApiArg, AxiosResponse<apiTypes.GetMapApiResponse>>(`/levels/by-id/${params.levelId}`, { signal });
        return res.data;
    },
    createMap: async (body: apiTypes.CreateMapRequest) => {
        const res = await api.post<apiTypes.CreateMapRequest, AxiosResponse<apiTypes.CreateMapApiResponse>>('/levels/create', body);
        return res.data;
    },
    updateMapImage: async (arg: apiTypes.UpdateMapImageApiArg) => {
        const formData = new FormData();
        formData.append('formFile', arg.body.file, 'filename.png');

        const res = await api.post<apiTypes.UpdateMapImageApiArg, AxiosResponse<apiTypes.UpdateMapImageApiResponse>>(
            `/levels/${arg.levelId}/update-image`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        return res.data;
    },
    deleteMap: async (params: apiTypes.DeleteMapApiArg) => {
        const res = await api.delete<apiTypes.DeleteMapApiArg, AxiosResponse<apiTypes.DeleteMapApiResponse>>(`/levels/remove/${params.levelId}`);
        return res.data;
    },
    setMapsTag: async (body: apiTypes.SetMapsTagApiArg) => {
        const res = await api.put<apiTypes.SetMapsTagApiArg, AxiosResponse<apiTypes.SetMapsTagApiResponse>>('/levels/set-tags', body);
        return res.data;
    },
    getCompletedByMapId: async (params: apiTypes.GetCompletedMapsByMapApiArg) => {
        const res = await api.get<apiTypes.GetCompletedMapsByMapApiArg, AxiosResponse<apiTypes.GetCompletedMapsByMapApiResponse>>(`/levels/completed/collect/by-map`, { params });
        return res.data;
    },
    addCompletedMap: async (arg: apiTypes.AddCompletedMapApiArg) => {
        const formData = new FormData();
        formData.append('formFile', arg.body.file, 'filename.png');

        const res = await api.post<apiTypes.AddCompletedMapApiArg, AxiosResponse<apiTypes.AddCompletedMapApiResponse>>(
            `/levels/${arg.levelId}/completed/create`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        );

        return res.data;
    },
    removeCompletedMap: async (params: apiTypes.RemoveCompletedMapApiArg) => {
        const res = await api.delete<apiTypes.RemoveCompletedMapApiArg, AxiosResponse<apiTypes.RemoveCompletedMapApiResponse>>(`/levels/${params.levelId}/completed/remove`);
        return res.data;
    },
    addFavorite: async (params: apiTypes.AddFavoriteMapApiArg) => {
        const res = await api.post<apiTypes.AddFavoriteMapApiArg, AxiosResponse<apiTypes.AddFavoriteMapApiResponse>>(`/levels/${params.levelId}/favorites/create`);
        return res.data;
    },
    removeFavorite: async (params: apiTypes.RemoveFavoriteMapApiArg) => {
        const res = await api.delete<apiTypes.RemoveFavoriteMapApiArg, AxiosResponse<apiTypes.RemoveFavoriteMapApiResponse>>(`/levels/${params.levelId}/favorites/delete`);
        return res.data;
    },
};

