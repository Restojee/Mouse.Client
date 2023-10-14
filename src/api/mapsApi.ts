import { AxiosResponse } from 'axios';
import api from '@/api/coreMapsApi';
import {
    CreateMapApiResponse,
    CreateMapRequest,
    DeleteMapApiArg,
    DeleteMapApiResponse,
    GetMapApiArg,
    GetMapApiResponse,
    GetMapsApiArg,
    Map, SetMapsTagApiArg,
    SetMapsTagApiResponse,
    UpdateMapImageApiArg,
    UpdateMapImageApiResponse,
} from '@/api/codegen/genMouseMapsApi';

export const mapsApi = {
    getMaps: async (params: GetMapsApiArg) => {
        const res = await api.get<GetMapsApiArg, AxiosResponse<Map[]>>('/maps/collect', { params });
        return res.data;
    },
    getMapsById: async (params: GetMapApiArg) => {
        const res = await api.get<GetMapApiArg, AxiosResponse<GetMapApiResponse>>(`/maps/one/by-id/${params.mapId}`);
        return res.data;
    },
    createMap: async (body: CreateMapRequest) => {
        const res = await api.post<CreateMapRequest, AxiosResponse<CreateMapApiResponse>>('/maps/create', body);
        return res.data;
    },
    updateMapImage: async (body: UpdateMapImageApiArg) => {
        const res = await api.put<UpdateMapImageApiArg, AxiosResponse<UpdateMapImageApiResponse>>(`/maps/update-image/${body.mapId}`, body);
        return res.data;
    },
    deleteMap: async (params: DeleteMapApiArg) => {
        const res = await api.delete<DeleteMapApiArg, AxiosResponse<DeleteMapApiResponse>>(`/maps/remove`, {params});
        return res.data;
    },
    setMapsTag: async (body: SetMapsTagApiArg) => {
        const res = await api.put<AxiosResponse<SetMapsTagApiResponse>>('/maps/set-tags', body);
        return res.data;
    },
    updateMap: { invalidatesTags: ['Map'] },
};

