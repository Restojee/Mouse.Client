import {
    GetUsersApiArg,
    GetUsersApiResponse,
} from '@/api/codegen/genMouseMapsApi';
import api from '@/api/coreMapsApi';
import { AxiosResponse } from 'axios';

export const usersApi = {
    getUsers: async () => {
        const res = await api.get<GetUsersApiArg, AxiosResponse<GetUsersApiResponse>>('/users');
        return res.data;
    },
};