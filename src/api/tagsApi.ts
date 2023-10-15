import { AxiosResponse } from 'axios';
import {
    CreateTagApiResponse,
    CreateTagRequest,
    DeleteTagApiArg,
    DeleteTagApiResponse,
    GetTagsApiArg,
    GetTagsApiResponse,
} from '@/api/codegen/genMouseMapsApi';
import api from '@/api/coreMapsApi';

export const tagsApi = {
    getTags: async () => {
        const res = await api.get<GetTagsApiArg, AxiosResponse<GetTagsApiResponse>>('/tags');
        return res.data;
    },
    createTag: async (body: CreateTagRequest) => {
        const res = await api.post<CreateTagRequest, AxiosResponse<CreateTagApiResponse>>('/tags', body);
        return res.data;
    },
    deleteTag: async (params: DeleteTagApiArg) => {
        const res = await api.delete<DeleteTagApiArg, AxiosResponse<DeleteTagApiResponse>>(`/tags/${params.tagId}`);
        return res.data;
    },
    endpoints: {
        getTags: { providesTags: ["Tag"] },
        getTag: { providesTags: ["Tag"] },
        createTag: { invalidatesTags: ["Tag"] },
        updateTag: { invalidatesTags: ["Tag"] },
        deleteTag: { invalidatesTags: ["Tag"] },
    }
}
