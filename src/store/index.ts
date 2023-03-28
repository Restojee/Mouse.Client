import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import { coreMapsApi } from "@/api/coreMapsApi";
import { createWrapper, Context } from 'next-redux-wrapper';
import { appReducer } from "@/bll/appReducer";

const rootReducer = combineReducers({
    [coreMapsApi.reducerPath]: coreMapsApi.reducer,
    app: appReducer
})

const makeStore = (context: Context) => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(coreMapsApi.middleware)
})

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof rootReducer>;