import { genMouseMapsApi } from "@/api/codegen/genMouseMapsApi";

export const mapsApi = genMouseMapsApi.enhanceEndpoints({
    endpoints: {
        getMaps: { providesTags: ["Map"] },
        getMapsByUser: { providesTags: ["Map"] },
        createMap: { invalidatesTags: ["Map"] },
        updateMap: { invalidatesTags: ["Map"] },
        deleteMap: { invalidatesTags: ["Map"] },
        updateMapImage: { invalidatesTags: ["Map"] },
        setMapTags: { invalidatesTags: ["Map", "Tag"] }
    }
})

export const {
    useUpdateMapMutation,
    useUpdateMapImageMutation,
    useSetMapTagsMutation,
    useGetMapQuery,
    useGetMapsQuery,
    useGetMapsByUserQuery,
    useDeleteMapMutation,
} = mapsApi;
