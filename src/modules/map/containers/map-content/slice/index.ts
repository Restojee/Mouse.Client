import {
    AddFavoriteMapApiArg,
    DeleteMapApiArg,
    GetMapApiArg,
    Map,
    UpdateMapImageApiArg,
} from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { convertDataUrlToBlob } from '@/common/utils/convertDataUrlToBlob';
import { deleteMap } from '@/modules/map/containers/map-list/slice';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapContentStateType, UpdateMapImageThunkArgType } from '../types';

export const deleteMapThunk = createAsyncThunk('map/delete', async (arg: DeleteMapApiArg, thunkAPI) => {
    try {
        await mapsApi.deleteMap(arg);
        thunkAPI.dispatch(deleteMap(arg.mapId));
        thunkAPI.dispatch(setCurrentMapContent(null));
        thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Удалено' }));
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка удаления' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const addFavorite = createAsyncThunk('map/favorite', async (arg: AddFavoriteMapApiArg, thunkAPI) => {
    try {
        await mapsApi.addFavorite(arg);
        thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Добавлено в избранное' }));
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка добавления в избранное' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const getMapByIdThunk = createAsyncThunk('map/get-by-id', async (arg: GetMapApiArg, thunkAPI) => {
    try {
        const map = await mapsApi.getMapsById(arg);
        thunkAPI.dispatch(setCurrentMapContent(map));
        thunkAPI.dispatch(setInitialMapContent(map));
        return thunkAPI.fulfillWithValue(map);

    } catch (error) {
        return thunkAPI.rejectWithValue(null);
    }
});

export const updateMapImageThunk = createAsyncThunk('map/update-image', async (arg: UpdateMapImageThunkArgType, thunkAPI) => {
    try {
        const file = convertDataUrlToBlob(arg.file);
        if (file && arg.mapId) {
            const validArg: UpdateMapImageApiArg = { mapId: arg.mapId, body: { file } };
            const map = await mapsApi.updateMapImage(validArg);
            thunkAPI.dispatch(getMapByIdThunk({ mapId: arg.mapId }));
            return map;
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(false);
    }
});

const initialState: MapContentStateType = {
    isMapImageModalOpen: false,
    initialMapContent: null,
    currentMapContent: null,
    isTagsModalOpen: false,
    isInitialMap: true,
    isImageFetching: true,
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
        },
        setIsInitialMap: (state, action: PayloadAction<boolean>) => {
            state.isInitialMap = action.payload;
        },
        setIsMapImageModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isMapImageModalOpen = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getMapByIdThunk.pending, (state, action) => {
                state.isImageFetching = true;
            })
            .addCase(getMapByIdThunk.fulfilled, (state, action) => {
                state.isImageFetching = false;
            });
    },
});

export const selectCurrentMapContent = (state: RootState) => state.map.currentMapContent;
export const selectInitialMapContent = (state: RootState) => state.map.initialMapContent;
export const selectIsTagsModalOpen = (state: RootState) => state.map.isTagsModalOpen;
export const selectIsInitialMap = (state: RootState) => state.map.isInitialMap;
export const selectIsMapImageModalOpen = (state: RootState) => state.map.isMapImageModalOpen;
export const selectIsImageFetching = (state: RootState) => state.map.isImageFetching;

export const {
    setInitialMapContent,
    setCurrentMapContent,
    openTagsModal,
    closeTagsModal,
    setIsInitialMap,
    setIsMapImageModalOpen,
} = slice.actions;
export const mapReducer = slice.reducer;