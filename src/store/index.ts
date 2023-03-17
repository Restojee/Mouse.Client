import {
    combineReducers,
    configureStore, Store
} from "@reduxjs/toolkit";
import { coreMapsApi } from "@/api/coreMapsApi";
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';

const rootReducer = combineReducers({
    [coreMapsApi.reducerPath]: coreMapsApi.reducer
})

const makeStore = (context: Context) => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coreMapsApi.middleware)
    }
)

export const wrapper = createWrapper(makeStore, { debug: false });