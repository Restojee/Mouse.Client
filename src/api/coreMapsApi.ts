import { accessTokenProvider } from "@/services";
import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const coreMapsApi = createApi({
    reducerPath: 'mapsApi',
    tagTypes: [ "Map", "Tag" ],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://tfm-maps.ru:8000/api',
        prepareHeaders: (headers, { getState }) => {
            const accessToken = accessTokenProvider.getToken();

            if (accessToken) {
                headers.set("Authorization", `Bearer ${ accessToken }` )
            }

            return headers;
        }
    }),
    endpoints: () => ({

    })
})