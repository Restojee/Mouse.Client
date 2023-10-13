
export const tagsApi = {
    endpoints: {
        getTags: { providesTags: ["Tag"] },
        getTag: { providesTags: ["Tag"] },
        createTag: { invalidatesTags: ["Tag"] },
        updateTag: { invalidatesTags: ["Tag"] },
        deleteTag: { invalidatesTags: ["Tag"] },
    }
}
