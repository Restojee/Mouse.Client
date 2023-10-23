import {
    User,
    MapCompleted,
    RemoveCompletedMapApiArg,
    GetCompletedMapsByMapApiArg,
} from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { convertDataUrlToBlob } from '@/common/utils/convertDataUrlToBlob';
import { UpdateMapImageThunkArgType } from '@/modules/map/containers/map-content/types';
import { RootState } from '@/store';
import { MapCompletedStateType } from '../type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getCompletedMapsByMapThunk = createAsyncThunk('completed-maps/get', async (arg: GetCompletedMapsByMapApiArg, thunkAPI) => {
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
        const currentUserId = state.auth.user?.id;
        const maps = state.completedMaps.completedMapsList;

        if (arg.mapId) {
            await mapsApi.addCompletedMap({ mapId: arg.mapId, body: { file } });
            await thunkAPI.dispatch(getCompletedMapsByMapThunk({ mapId: arg.mapId }));

            const updatedMapContent = maps.find(map => map.user?.id === currentUserId);

            thunkAPI.dispatch(setActiveMapCompletedById(updatedMapContent?.user?.id));
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
        await mapsApi.removeCompletedMap(arg);

        thunkAPI.dispatch(getCompletedMapsByMapThunk(arg));
        thunkAPI.dispatch(setActiveMapCompletedById(null));
        thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Успешно удалено' }));
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка удаления' }));
    }
});

const initialState: MapCompletedStateType = {
    isModalOpen: false,
    completedMapsList: [],
    activeMapCompleted: null,
};
const slice = createSlice({
    name: 'completed-maps',
    initialState,
    reducers: {
        setCompletedMaps: (state, action: PayloadAction<MapCompleted[]>) => {
            state.completedMapsList = action.payload;
        },
        addCompletedMap: (state, action: PayloadAction<MapCompleted>) => {
            state.completedMapsList.push(action.payload);
        },
        setIsCompletedMapModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload;
        },
        setActiveMapCompletedById: (state, action: PayloadAction<User['id'] | null>) => {
            if (action.payload === null) {
                state.activeMapCompleted = null;
                return;
            }

            const map = state.completedMapsList.find(map => map.user.id === action.payload);

            if (action.payload && map) {
                state.activeMapCompleted = map;
            }
        },
    },
});

export const selectActiveMapCompleted = (state: RootState) => state.completedMaps?.activeMapCompleted;
export const selectCompletedMaps = (state: RootState) => state.completedMaps?.completedMapsList;
export const selectIsCompletedModalOpen = (state: RootState) => state.completedMaps?.isModalOpen;

export const {
    setCompletedMaps,
    addCompletedMap,
    setIsCompletedMapModalOpen,
    setActiveMapCompletedById,
} = slice.actions;
export const completedMapsReducer = slice.reducer;
