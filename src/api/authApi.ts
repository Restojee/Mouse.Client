import { GetCurrentUserApiArg, GetCurrentUserApiResponse } from '@/api/codegen/genMouseMapsApi';
import api from '@/api/coreMapsApi';
import axios, { AxiosResponse } from 'axios';

export const authApi = {
    getCurrentUser: async () => {
        const res = await api.get<GetCurrentUserApiArg, AxiosResponse<GetCurrentUserApiResponse>>('/users/current');
        return res.data;
    },
    refresh: async (client_id: number, client_secret: string) => {
        const res = await axios.get(
            'http://151.248.121.176:8000/api/oauth2/token',
            {params: {client_id, client_secret}}
        )
        console.log(res)
    }
};