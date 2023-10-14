import { DeleteMapApiArg, DeleteMapApiResponse, GetMapApiArg, GetMapsApiArg, Map } from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property } from 'csstype';
import { MapsStateType } from '../types';
import Rotate = Property.Rotate;

export const deleteMapsThunk = createAsyncThunk('map/delete', async (arg: DeleteMapApiArg, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState
        await mapsApi.deleteMap(arg)


        return maps;
    } catch (error) {
        thunkAPI.rejectWithValue('Ошибка загрузки карт');
        return null;
    }
});

export const getMapsThunk = createAsyncThunk('map/get', async (arg: GetMapsApiArg, thunkAPI) => {
    try {
        const maps = await mapsApi.getMaps(arg);

        thunkAPI.dispatch(setMaps(maps));

        return maps;
    } catch (error) {
        thunkAPI.rejectWithValue('Ошибка загрузки карт');
        return null;
    }
});

export const getMapByIdThunk = createAsyncThunk('map/get-by-id', async (arg: GetMapApiArg, thunkAPI) => {
    try {
        const map = await mapsApi.getMapsById(arg);
        thunkAPI.dispatch(setMapContent(map));
        return map;

    } catch (error) {
        thunkAPI.rejectWithValue('Ошибка загрузки карты');
        return null;
    }
});

const initialState: MapsStateType = {
    mapsList: [],
    mapContent: null,
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
        setMapContent: (state, action: PayloadAction<Map>) => {
            state.mapContent = action.payload;
        },
    },
});

export const selectMaps = (state: RootState) => state.maps.mapsList;
export const selectMapContent = (state: RootState) => state.maps.mapContent;

export const {
    setMaps,
    addMap,
    setMapContent,
} = slice.actions;
export const mapsReducer = slice.reducer;