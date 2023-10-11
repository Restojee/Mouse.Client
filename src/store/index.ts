import { tagsReducer } from '@/modules/tag';
import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import { createWrapper, Context } from 'next-redux-wrapper';
import { appReducer } from "@/bll/appReducer";

const rootReducer = combineReducers({
    app: appReducer,
    tags: tagsReducer,
})

const makeStore = (context: Context) => configureStore({
    reducer: rootReducer,
})

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof rootReducer>;