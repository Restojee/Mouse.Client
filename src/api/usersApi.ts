import {
    GetUsersApiArg,
    GetUsersApiResponse,
} from '@/api/codegen/genMouseMapsApi';
import api from '@/api/coreMapsApi';
import { AxiosResponse } from 'axios';

export const usersApi = {
    getUsers: async (params: GetUsersApiArg) => {
        const res = await api.get<GetUsersApiArg, AxiosResponse<GetUsersApiResponse>>('/users/collect', { params });
        return res.data;
    },
};