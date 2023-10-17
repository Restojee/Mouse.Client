import { AddFavoriteMapApiArg, DeleteMapApiArg, GetMapApiArg, Map } from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { deleteMap } from '@/modules/map/containers/map-list/slice';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapContentStateType } from '../types';

export const deleteMapsThunk = createAsyncThunk('map/delete', async (arg: DeleteMapApiArg, thunkAPI) => {
    try {
        await mapsApi.deleteMap(arg)
        thunkAPI.dispatch(deleteMap(arg.mapId))
        thunkAPI.dispatch(setCurrentMapContent(null))
        thunkAPI.dispatch(setAppMessage({severity: 'success', text: 'Удалено'}))
        return thunkAPI.fulfillWithValue(true)
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: 'Ошибка удаления'}))
        return thunkAPI.rejectWithValue(false);
    }
});

export const addFavorite = createAsyncThunk('map/favorite', async (arg: AddFavoriteMapApiArg, thunkAPI) => {
    try {
        await mapsApi.addFavorite(arg)
        thunkAPI.dispatch(setAppMessage({severity: 'success', text: 'Добавлено в избранное'}))
        return thunkAPI.fulfillWithValue(true)
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: 'Ошибка добавления в избранное'}))
        return thunkAPI.rejectWithValue(false);
    }
});

export const getMapByIdThunk = createAsyncThunk('map/get-by-id', async (arg: GetMapApiArg, thunkAPI) => {
    try {
        const map = await mapsApi.getMapsById(arg);
        thunkAPI.dispatch(setCurrentMapContent(map));
        thunkAPI.dispatch(setInitialMapContent(map));
        return map;

    } catch (error) {
        thunkAPI.rejectWithValue('Ошибка загрузки карты');
        return null;
    }
});

const initialState: MapContentStateType = {
    initialMapContent: null,
    currentMapContent: null,
    isTagsModalOpen: false,
};

const slice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setInitialMapContent: (state, action: PayloadAction<Map | null>) => {
            state.initialMapContent = action.payload;
        },
        setCurrentMapContent: (state, action: PayloadAction<Map | null>) => {
            state.currentMapContent = { ...state.initialMapContent, ...action.payload } as Map;
        },
        openTagsModal: (state) => {
            state.isTagsModalOpen = true;
        },
        closeTagsModal: (state) => {
            state.isTagsModalOpen = false;
            state.currentMapContent = null;
        },
    },
});

export const selectCurrentMapContent = (state: RootState) => state.map.currentMapContent;
export const selectInitialMapContent = (state: RootState) => state.map.initialMapContent;
export const selectIsTagsModalOpen = (state: RootState) => state.map.isTagsModalOpen;

export const {
    setInitialMapContent,
    setCurrentMapContent,
    openTagsModal,
    closeTagsModal,
} = slice.actions;
export const mapReducer = slice.reducer;