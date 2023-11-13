import {
    GetCurrentUserApiArg,
    GetCurrentUserApiResponse,
    LoginRequest,
    LoginResponse, RegisterRequest, RegisterResponse,
} from '@/api/codegen/genMouseMapsApi';
import api from '@/api/coreMapsApi';
import axios, { AxiosResponse } from 'axios';

export const authApi = {
    getCurrentUser: async () => {
        const res = await api.get<GetCurrentUserApiArg, AxiosResponse<GetCurrentUserApiResponse>>('/users/me');
        return res.data;
    },
    login: async (body: LoginRequest) => {
        const res = await api.post<LoginRequest, AxiosResponse<LoginResponse>>('/auth/login', body);
        return res.data;
    },
    register: async (body: RegisterRequest) => {
        const res = await api.post<RegisterRequest, AxiosResponse<RegisterResponse>>('/auth/register', body);
        return res.data;
    },
};