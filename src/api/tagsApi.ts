import { AxiosResponse } from 'axios';
import {
    CreateTagApiResponse,
    CreateTagRequest,
    DeleteTagApiArg,
    DeleteTagApiResponse,
    GetTagsApiArg,
    GetTagsApiResponse, UpdateTagApiArg, UpdateTagApiResponse,
} from "@/api/codegen/genMouseMapsApi";
import api from '@/api/coreMapsApi';

export const tagsApi = {
    getTags: async () => {
        const res = await api.get<GetTagsApiArg, AxiosResponse<GetTagsApiResponse>>('/tags/collect');
        return res.data;
    },
    createTag: async (body: CreateTagRequest) => {
        const res = await api.post<CreateTagRequest, AxiosResponse<CreateTagApiResponse>>('/tags/create', body);
        return res.data;
    },
    deleteTag: async (params: DeleteTagApiArg) => {
        const res = await api.delete<DeleteTagApiArg, AxiosResponse<DeleteTagApiResponse>>(`/tags/delete/${params.tagId}`);
        return res.data;
    },
    updateTag: async (body: UpdateTagApiArg['updateTagRequest']) => {
        const res = await api.put<UpdateTagApiArg, AxiosResponse<UpdateTagApiResponse>>(`/tags/update`, body);
        return res.data;
    },
}
