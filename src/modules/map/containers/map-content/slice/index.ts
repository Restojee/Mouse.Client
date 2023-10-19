import {
    AddFavoriteMapApiArg,
    DeleteMapApiArg,
    GetMapApiArg,
    Map,
    Tag,
    UpdateMapImageApiArg,
} from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { convertDataUrlToBlob } from '@/common/utils/convertDataUrlToBlob';
import { gatherValuesByKey } from '@/common/utils/getValuesByKey';
import { deleteMap } from '@/modules/map/containers/map-list/slice';
import { setTagModalType } from '@/modules/tag';
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

export const updateMapTagsThunk = createAsyncThunk('tag/set-map-tags', async (mapId: Map['id'], thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const tagIds = state.map.selectedModalTagIds;
        if (tagIds) {
            const map = await mapsApi.setMapsTag({ mapId, tagIds });
            thunkAPI.dispatch(setTagModalType(null));
            thunkAPI.dispatch(setMapContentTags(map.tags || []));
        }
        thunkAPI.dispatch(setAppMessage({ text: 'Теги успешно добавлены', severity: 'success' }));
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ text: 'Ошибка добавления тегов', severity: 'error' }));
    }
});

const initialState: MapContentStateType = {
    isMapImageModalOpen: false,
    initialMapContent: null,
    currentMapContent: null,
    isInitialMap: true,
    isImageFetching: true,
    selectedModalTagIds: [],
};

const slice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setInitialMapContent: (state, action: PayloadAction<Map | null>) => {
            state.initialMapContent = action.payload;
            if (action.payload?.tags) {
                state.selectedModalTagIds = gatherValuesByKey<Tag, number>(action.payload?.tags, 'id');
            }
        },
        setCurrentMapContent: (state, action: PayloadAction<Map | null>) => {
            state.currentMapContent = { ...state.initialMapContent, ...action.payload } as Map;
            if (action.payload?.tags) {
                state.selectedModalTagIds = gatherValuesByKey<Tag, number>(action.payload?.tags, 'id');
            }
        },
        setIsInitialMap: (state, action: PayloadAction<boolean>) => {
            state.isInitialMap = action.payload;
        },
        setIsMapImageModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isMapImageModalOpen = action.payload;
        },
        setSelectedTagIds: (state, action: PayloadAction<number[]>) => {
            state.selectedModalTagIds = action.payload;
        },
        toggleSelectedTagById: (state, action: PayloadAction<number>) => {
            const isAlreadySelected = state.selectedModalTagIds.includes(action.payload);

            if (isAlreadySelected) {
                state.selectedModalTagIds = state.selectedModalTagIds.filter(id => id !== action.payload);
            } else {
                state.selectedModalTagIds.push(action.payload);
            }
        },
        setMapContentTags: (state, action: PayloadAction<Tag[]>) => {
            if (state.currentMapContent) {
                state.currentMapContent = { ...state.currentMapContent, tags: action.payload };
            }
            if (state.initialMapContent) {
                state.initialMapContent = { ...state.initialMapContent, tags: action.payload };
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getMapByIdThunk.pending, (state) => {
                state.isImageFetching = true;
            })
            .addCase(getMapByIdThunk.fulfilled, (state) => {
                state.isImageFetching = false;
            });
    },
});

export const selectSelectedTagIds = (state: RootState) => state.map.selectedModalTagIds;
export const selectCurrentMapContent = (state: RootState) => state.map.currentMapContent;
export const selectInitialMapContent = (state: RootState) => state.map.initialMapContent;
export const selectIsInitialMap = (state: RootState) => state.map.isInitialMap;
export const selectIsMapImageModalOpen = (state: RootState) => state.map.isMapImageModalOpen;
export const selectIsImageFetching = (state: RootState) => state.map.isImageFetching;

export const {
    setInitialMapContent,
    setCurrentMapContent,
    setIsInitialMap,
    setIsMapImageModalOpen,
    toggleSelectedTagById,
    setMapContentTags,
    setSelectedTagIds
} = slice.actions;
export const mapReducer = slice.reducer;