import { mapCommentsReducer } from '@/modules/map/containers/map-content/containers/comments/slice';
import { mapCreateReducer } from '@/modules/map/containers/map-create';
import { mapsReducer } from '@/modules/map/containers/map-list/slice';
import { tagsReducer } from '@/modules/tag';
import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { appReducer } from "@/bll/appReducer";
import { AnyAction } from 'redux';

const rootReducer = combineReducers({
    app: appReducer,
    tags: tagsReducer,
    comments: mapCommentsReducer,
    maps: mapsReducer,
    mapCreate: mapCreateReducer,
})

const reducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

const makeStore = (context: Context) => configureStore({
    reducer,
})

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof rootReducer>;