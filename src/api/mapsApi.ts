import { AxiosResponse } from 'axios';
import api from '@/api/coreMapsApi';
import { CreateMapApiArg, CreateMapApiResponse, CreateMapRequest, Map } from '@/api/codegen/genMouseMapsApi';

export const mapsApi = {
    getMaps: async (params: { page: number, size: number }) => {
        const res = await api.get<AxiosResponse<Map[]>>('/maps/collect', { params });
        return res.data;
    },
    createMap: async (body: CreateMapApiArg) => {
        const res = await api.post<CreateMapRequest, AxiosResponse<CreateMapApiResponse>>('/maps/create', { body });
        return res.data;
    },
    getMapsByUser: { providesTags: ['Map'] },
    updateMap: { invalidatesTags: ['Map'] },
    deleteMap: { invalidatesTags: ['Map'] },
    updateMapImage: { invalidatesTags: ['Map'] },
    setMapsTag: { invalidatesTags: ['Map', 'Tag'] },
};

export const {
    getMaps,
    getMapsByUser,
    createMap,
    updateMap,
    deleteMap,
    updateMapImage,
    setMapsTag,
} = mapsApi;
