import { mapCommentsReducer } from '@/modules/map/containers/map-content/containers/comments/slice';
import { mapCreateReducer } from '@/modules/map/containers/map-create';
import { mapsReducer } from '@/modules/map/containers/map-list/slice';
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
    comments: mapCommentsReducer,
    maps: mapsReducer,
    mapCreate: mapCreateReducer,
})

const makeStore = (context: Context) => configureStore({
    reducer: rootReducer,
})

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof rootReducer>;