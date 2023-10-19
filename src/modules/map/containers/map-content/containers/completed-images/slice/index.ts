import {
    GetCompletedMapsByMapApiArg,
    Map,
    RemoveCompletedMapApiArg, User,
} from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { convertDataUrlToBlob } from '@/common/utils/convertDataUrlToBlob';
import { setCurrentMapContent } from '@/modules/map/containers/map-content/slice';
import { UpdateMapImageThunkArgType } from '@/modules/map/containers/map-content/types';
import { RootState } from '@/store';
import { MapCompletedStateType } from '../type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getCompletedMapsThunk = createAsyncThunk('completed-maps/get', async (arg: GetCompletedMapsByMapApiArg, thunkAPI) => {
    try {
        const completedMaps = await mapsApi.getCompletedByMapId(arg);
        thunkAPI.dispatch(setCompletedMaps(completedMaps));
        return thunkAPI.fulfillWithValue(completedMaps);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка загрузки карт' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const addCompletedMapThunk = createAsyncThunk('completed-maps/create', async (arg: UpdateMapImageThunkArgType, thunkAPI) => {
    try {
        const file = convertDataUrlToBlob(arg.file);
        const state = thunkAPI.getState() as RootState;
        const currentMapContent = state.map.currentMapContent;
        const currentUserId = state.auth.user?.id;

        if (arg.mapId) {
            await mapsApi.addCompletedMap({ mapId: arg.mapId, body: { file } });
            const res = await thunkAPI.dispatch(getCompletedMapsThunk({ mapId: arg.mapId }));
            const maps = res.payload as Map[];

            if (maps.length) {
                const updatedMapContent = maps.find(map => map.user?.id === currentUserId);
                thunkAPI.dispatch(setCurrentMapContent({ ...currentMapContent, image: updatedMapContent?.image } as Map));
                thunkAPI.dispatch(setActiveMapIdentifier(updatedMapContent?.user?.id));
            }

            thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Успешно добавлено' }));
        }
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка добавления' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const deleteCompletedMapThunk = createAsyncThunk('completed-maps/delete', async (arg: RemoveCompletedMapApiArg, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const initialMapContent = state.map.initialMapContent;
        await mapsApi.removeCompletedMap(arg);
        thunkAPI.dispatch(getCompletedMapsThunk(arg));
        thunkAPI.dispatch(setCurrentMapContent(initialMapContent));
        thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Успешно удалено' }));

    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка удаления' }));
    }
});

const initialState: MapCompletedStateType = {
    isModalOpen: false,
    completedMapsList: [],
    activeMapIdentifier: null
};
const slice = createSlice({
    name: 'completed-maps',
    initialState,
    reducers: {
        setCompletedMaps: (state, action: PayloadAction<Map[]>) => {
            state.completedMapsList = action.payload;
        },
        addCompletedMap: (state, action: PayloadAction<Map>) => {
            state.completedMapsList.push(action.payload);
        },
        setIsCompletedMapModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload;
        },
        setActiveMapIdentifier: (state, action: PayloadAction<User['id'] | null>) => {
            state.activeMapIdentifier = action.payload;
        },
    },
});

export const selectActiveMapIdentifier = (state: RootState) => state.completedMaps?.activeMapIdentifier;
export const selectCompletedMaps = (state: RootState) => state.completedMaps?.completedMapsList;
export const selectIsCompletedModalOpen = (state: RootState) => state.completedMaps?.isModalOpen;

export const {
    setCompletedMaps,
    addCompletedMap,
    setIsCompletedMapModalOpen,
    setActiveMapIdentifier
} = slice.actions;
export const completedMapsReducer = slice.reducer;
