import {
    DeleteMapApiArg, GetCompletedMapsByUserApiArg,
    GetFavoriteMapsByUserApiArg,
    GetMapApiArg,
    GetMapsApiArg,
    Map,
} from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapsStateType } from '../types';

export const getMapsThunk = createAsyncThunk('map/get', async (arg: GetMapsApiArg, thunkAPI) => {
    try {
        const maps = await mapsApi.getMaps(arg);

        thunkAPI.dispatch(setMaps(maps));

        return maps;
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: `Ошибка загрузки карт: ${Error}`}))
    }
});

export const getFavoriteMapsThunk = createAsyncThunk('map/get-favorites', async (arg: GetFavoriteMapsByUserApiArg, thunkAPI) => {
    try {
        const maps = await mapsApi.getFavorites(arg);
        thunkAPI.dispatch(setMaps(maps));
        return maps;
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: `Ошибка загрузки карт: ${Error}`}))
    }
});

export const getCompletedMapsThunk = createAsyncThunk('map/get-completed', async (arg: GetCompletedMapsByUserApiArg, thunkAPI) => {
    try {
        const maps = await mapsApi.getCompleted(arg);
        thunkAPI.dispatch(setMaps(maps));
        return maps;
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: `Ошибка загрузки карт: ${Error}`}))
    }
});

const initialState: MapsStateType = {
    mapsList: [],
};

const slice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        setMaps: (state, action: PayloadAction<Map[]>) => {
            state.mapsList = action.payload;
        },
        addMap: (state, action: PayloadAction<Map>) => {
            state.mapsList.push(action.payload);
        },
        deleteMap: (state, action: PayloadAction<Map['id']>) => {
            state.mapsList = state.mapsList.filter(el => el.id !== action.payload)
        },
    },
});

export const selectMaps = (state: RootState) => state.maps.mapsList;

export const {
    setMaps,
    addMap,
    deleteMap
} = slice.actions;
export const mapsReducer = slice.reducer;