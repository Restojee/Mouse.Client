import { DeleteMapApiArg, GetMapApiArg, Map } from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { deleteMap } from '@/modules/map/containers/map-list/slice';
import { MapContentStateType } from '../types';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const deleteMapsThunk = createAsyncThunk('map/delete', async (arg: DeleteMapApiArg, thunkAPI) => {
    try {
        await mapsApi.deleteMap(arg)
        thunkAPI.dispatch(deleteMap(arg.mapId))
        thunkAPI.dispatch(setMapContent(null))
        thunkAPI.dispatch(setAppMessage({severity: 'success', text: 'Удалено'}))
        return thunkAPI.fulfillWithValue(true)
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: 'Ошибка удаления'}))
        return thunkAPI.rejectWithValue(false);
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

const initialState: MapContentStateType = {
    mapContent: null,
    isTagsModalOpen: false,
};

const slice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapContent: (state, action: PayloadAction<Map | null>) => {
            state.mapContent = action.payload;
        },
        openTagsModal: (state) => {
            state.isTagsModalOpen = true;
        },
        closeTagsModal: (state) => {
            state.isTagsModalOpen = false;
            state.mapContent = null;
        },
    },
});

export const selectMapContent = (state: RootState) => state.map.mapContent;
export const selectIsTagsModalOpen = (state: RootState) => state.map.isTagsModalOpen;

export const {
    setMapContent,
    openTagsModal,
    closeTagsModal,
} = slice.actions;
export const mapReducer = slice.reducer;