import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const coreMapsApi = createApi({
    reducerPath: 'mapsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://tfm-maps.ru:8000/api' }),
    endpoints: () => ({

    })
})