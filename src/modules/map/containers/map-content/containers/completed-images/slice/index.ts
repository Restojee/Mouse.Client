import { AddCompletedMapApiArg, GetCompletedMapsByMapApiArg, Map } from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { RootState } from '@/store';
import { MapCompletedStateType } from '../type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getCompletedMapsThunk = createAsyncThunk('completed-maps/get', async (arg: GetCompletedMapsByMapApiArg, thunkAPI) => {
    try {
        const completedMaps = await mapsApi.getCompletedByMapId(arg);
        thunkAPI.dispatch(setCompletedMaps(completedMaps));
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка добавления' }));
    }
});

export const addCompletedMapThunk = createAsyncThunk('completed-maps/create', async (arg: AddCompletedMapApiArg, thunkAPI) => {
    try {
        await mapsApi.addCompletedMap(arg);
        thunkAPI.dispatch(getCompletedMapsThunk(arg))
        thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Успешно добавлено' }));

    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка добавления' }));
    }
});

const initialState: MapCompletedStateType = {
    mapsList: [],
};
const slice = createSlice({
    name: 'completed-maps',
    initialState,
    reducers: {
        setCompletedMaps: (state, action: PayloadAction<Map[]>) => {
            state.mapsList = action.payload;
        },
        addCompletedMap: (state, action: PayloadAction<Map>) => {
            state.mapsList.push(action.payload);
        },
    },
});

export const selectCompletedMaps = (state: RootState) => state.completedMaps?.mapsList;

export const {
    setCompletedMaps,
    addCompletedMap,
} = slice.actions;
export const completedMapsReducer = slice.reducer;
