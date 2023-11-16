import { appReducer } from '@/bll/appReducer';
import { authReducer } from '@/modules/auth/slice';
import { chatReducer } from '@/modules/chat/slice';
import { infoReducer } from '@/modules/info/slice';
import { mapCommentsReducer } from '@/modules/map/containers/map-content/containers/comments/slice';
import { completedMapsReducer } from '@/modules/map/containers/map-content/containers/completed-images/slice';
import { mapNoteReducer } from '@/modules/map/containers/map-content/containers/note/slice';
import { mapReducer } from '@/modules/map/containers/map-content/slice';
import { mapCreateReducer } from '@/modules/map/containers/map-create';
import { mapsReducer } from '@/modules/map/containers/map-list/slice';
import { tagsReducer } from '@/modules/tag';
import { usersReducer } from '@/modules/user/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Context, createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    tags: tagsReducer,
    users: usersReducer,
    chat: chatReducer,
    comments: mapCommentsReducer,
    maps: mapsReducer,
    map: mapReducer,
    mapNote: mapNoteReducer,
    completedMaps: completedMapsReducer,
    mapCreate: mapCreateReducer,
    info: infoReducer,
})

// @ts-ignore
const makeStore = (context: Context) => configureStore({ reducer: rootReducer })

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof rootReducer>;