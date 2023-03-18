import { genMouseMapsApi } from "@/api/codegen/genMouseMapsApi";

export const tagsApi = genMouseMapsApi.enhanceEndpoints({
    endpoints: {
        getTags: { providesTags: ["Tag"] },
        getTag: { providesTags: ["Tag"] },
        createTag: { invalidatesTags: ["Tag"] },
        updateTag: { invalidatesTags: ["Tag"] },
        deleteTag: { invalidatesTags: ["Tag"] },
    }
})

export const {
    useUpdateTagMutation,
    useGetTagQuery,
    useCreateTagMutation,
    useGetTagsQuery,
    useDeleteTagMutation,
} = tagsApi;
