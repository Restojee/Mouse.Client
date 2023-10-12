import {
    CreateCommentApiResponse,
    CreateCommentRequest,
    GetCommentsByMapIdApiArg,
    GetCommentsByMapIdApiResponse,
} from '@/api/codegen/genMouseMapsApi';
import api from '@/api/coreMapsApi';
import { AxiosResponse } from 'axios';

export const commentsApi = {
    getCommentsByMapId: async (params: GetCommentsByMapIdApiArg) => {
        const res = await api.get<GetCommentsByMapIdApiArg, AxiosResponse<GetCommentsByMapIdApiResponse>>(`/comments/by-map/${params.mapId}`, { params });
        return res.data;
    },
    addComment: async (body: CreateCommentRequest) => {
        const res = await api.post<CreateCommentRequest, AxiosResponse<CreateCommentApiResponse>>('/comments', body);
        return res.data;
    },
};