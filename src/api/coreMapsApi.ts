import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {getSession} from "next-auth/react";

export const coreMapsApi = createApi({
    reducerPath: 'mapsApi',
    tagTypes: [ "Map", "Tag" ],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://tfm-maps.ru:8000/api',
        prepareHeaders: async headers => {
            const session = await getSession();
            if (session?.accessToken) {
                headers.set("Authorization", `Bearer ${ session?.accessToken }` )
            }
            return headers;
        }
    }),
    endpoints: () => ({

    })
})