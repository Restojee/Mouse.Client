import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import { coreMapsApi } from "@/api/coreMapsApi";

const rootReducer = combineReducers({
    [coreMapsApi.reducerPath]: coreMapsApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coreMapsApi.middleware)
})