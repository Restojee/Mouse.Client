import { GetCurrentUserApiArg, GetCurrentUserApiResponse } from '@/api/codegen/genMouseMapsApi';
import api from '@/api/coreMapsApi';
import { AxiosResponse } from 'axios';

export const authApi = {
    getCurrentUser: async () => {
        const res = await api.get<GetCurrentUserApiArg, AxiosResponse<GetCurrentUserApiResponse>>('/users/current');
        return res.data;
    },
};