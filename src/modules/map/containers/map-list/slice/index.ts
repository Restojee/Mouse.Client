import {
    GetCompletedMapsByUserApiArg,
    GetFavoriteMapsByUserApiArg,
    GetMapsApiArg,
    Map,
} from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { getCompletedMapsByMapThunk } from '@/modules/map/containers/map-content/containers/completed-images/slice';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapsStateType } from '../types';

export const getMapsThunk = createAsyncThunk('map/get', async (arg: GetMapsApiArg, thunkAPI) => {
    try {
        const maps = await mapsApi.getMaps(arg);

        thunkAPI.dispatch(setMaps(maps.records));

        return maps;
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: `Ошибка загрузки карт: ${Error}` }));
    }
});

export const getFavoriteMapsThunk = createAsyncThunk('map/get-favorites', async (arg: GetFavoriteMapsByUserApiArg, thunkAPI) => {
    try {
        const maps = await mapsApi.getFavorites(arg);
        thunkAPI.dispatch(setMaps(maps.records));
        return maps;
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: `Ошибка загрузки карт: ${Error}` }));
    }
});

export const getCompletedMapsByUserIdThunk = createAsyncThunk('map/get-completed', async (arg: GetCompletedMapsByUserApiArg, thunkAPI) => {
    try {
        const maps = await mapsApi.getCompletedByUserId(arg);
        thunkAPI.dispatch(setMaps(maps.records));
        return maps;
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: `Ошибка загрузки карт: ${Error}` }));
    }
});

const initialState: MapsStateType = {
    records: [],
    totalRecordsCount: 0,
    pageSize: 100,
    pageNumber: 0,
    isMapsFetching: false,
};

const slice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        setMaps: (state, action: PayloadAction<Map[]>) => {
            state.records = action.payload;
        },
        addMap: (state, action: PayloadAction<Map>) => {
            state.records.unshift(action.payload);
        },
        deleteMap: (state, action: PayloadAction<Map['id']>) => {
            state.records = state.records.filter(el => el.id !== action.payload);
        },
        setMapImageById: (state, action: PayloadAction<{mapId: Map['id'], updatedMap: Map}>) => {
            state.records = state.records.map((map) => {
                if (map.id === action.payload.mapId) {
                    return action.payload.updatedMap;
                }
                return map;
            });
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getMapsThunk.pending, (state) => {
                state.isMapsFetching = true;
            })
            .addCase(getFavoriteMapsThunk.pending, (state) => {
                state.isMapsFetching = true;
            })
            .addCase(getCompletedMapsByUserIdThunk.pending, (state) => {
                state.isMapsFetching = true;
            })
            .addCase(getMapsThunk.fulfilled, (state) => {
                state.isMapsFetching = false;
            })
            .addCase(getFavoriteMapsThunk.fulfilled, (state) => {
                state.isMapsFetching = false;
            })
            .addCase(getCompletedMapsByUserIdThunk.fulfilled, (state) => {
                state.isMapsFetching = false;
            })
            .addCase(getMapsThunk.rejected, (state) => {
                state.isMapsFetching = false;
            })
            .addCase(getFavoriteMapsThunk.rejected, (state) => {
                state.isMapsFetching = false;
            })
            .addCase(getCompletedMapsByMapThunk.rejected, (state) => {
                state.isMapsFetching = false;
            });
    },
});

export const selectMaps = (state: RootState) => state.maps.records;
export const selectIsMapsFetching = (state: RootState) => state.maps.isMapsFetching;

export const {
    setMaps,
    addMap,
    deleteMap,
    setMapImageById
} = slice.actions;
export const mapsReducer = slice.reducer;