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
import {
    getMapCommentsThunk,
    setComments,
    setIsCommentsInitialized,
} from '@/modules/map/containers/map-content/containers/comments/slice';
import {
    getCompletedMapsByMapThunk,
    setActiveMapCompletedById,
    setCompletedMaps,
} from '../containers/completed-images/slice';
import { deleteMap, setMapImageById } from '@/modules/map/containers/map-list/slice';
import { setTagModalType } from '@/modules/tag';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapContentStateType, UpdateMapImageThunkArgType } from '../types';

let mapByIdAbortController = new AbortController();

export const onOpenMapContentThunk = createAsyncThunk('map/open-map', async (arg: { mapId: Map['id'] }, thunkAPI) => {
    mapByIdAbortController = new AbortController();
    try {
        if (arg?.mapId) {
            const mapId = arg.mapId;
            thunkAPI.dispatch(getMapByIdThunk({mapId}));
            thunkAPI.dispatch(getCompletedMapsByMapThunk({ mapId }));
            thunkAPI.dispatch(getMapCommentsThunk({ mapId }));
        }
    } catch (error) {
        console.log(error);
    }
});

export const onCloseMapContentThunk = createAsyncThunk('map/close-map', async (arg, thunkAPI) => {
    mapByIdAbortController.abort();
    try {
        thunkAPI.dispatch(setCompletedMaps([]));
        thunkAPI.dispatch(setSelectedTagIds([]));
        thunkAPI.dispatch(setActiveMapCompletedById(null));
        thunkAPI.dispatch(setIsMapContentImageFetching(true));
        thunkAPI.dispatch(setMapContent(null));
        thunkAPI.dispatch(setComments([]));
        thunkAPI.dispatch(setIsCommentsInitialized(false));
    } catch (error) {
        console.log(error);
    }
});

export const deleteMapThunk = createAsyncThunk('map/delete', async (arg: DeleteMapApiArg, thunkAPI) => {
    try {
        await mapsApi.deleteMap(arg);
        thunkAPI.dispatch(deleteMap(arg.mapId));
        thunkAPI.dispatch(setMapContent(null));
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
        const map = await mapsApi.getMapsById({mapId:arg.mapId}, mapByIdAbortController.signal);
        thunkAPI.dispatch(setMapContent(map));
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
            await mapsApi.updateMapImage(validArg);
            const updatedMap = await thunkAPI.dispatch(getMapByIdThunk({ mapId: arg.mapId }));

            if (updatedMap.payload) {
                thunkAPI.dispatch(setMapImageById({ mapId: arg.mapId, updatedMap: updatedMap.payload as Map }));
            }
            thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Обложка обновлена' }));
            return thunkAPI.fulfillWithValue(true);
        }
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка обновления обложки' }));
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
        }
        thunkAPI.dispatch(setAppMessage({ text: 'Теги успешно добавлены', severity: 'success' }));
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ text: 'Ошибка добавления тегов', severity: 'error' }));
    }
});

const initialState: MapContentStateType = {
    isMapImageModalOpen: false,
    mapContent: null,
    isMapFetching: true,
    selectedModalTagIds: [],
};

const slice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapContent: (state, action: PayloadAction<Map | null>) => {
            state.mapContent = action.payload;
        },
        setIsMapImageModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isMapImageModalOpen = action.payload;
        },
        setSelectedTagIds: (state, action: PayloadAction<number[]>) => {
            state.selectedModalTagIds = action.payload;
        },
        setIsMapContentImageFetching: (state, action: PayloadAction<boolean>) => {
            state.isMapFetching = action.payload;
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
            if (state.mapContent) {
                state.mapContent = { ...state.mapContent, tags: action.payload };
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getMapByIdThunk.pending, (state) => {
                state.isMapFetching = true;
            })
            .addCase(getMapByIdThunk.fulfilled, (state) => {
                state.isMapFetching = false;
            })
            .addCase(getMapByIdThunk.rejected, (state) => {
                state.isMapFetching = false;
            });
    },
});

export const selectSelectedTagIds = (state: RootState) => state.map.selectedModalTagIds;
export const selectMapContent = (state: RootState) => state.map.mapContent;
export const selectIsMapImageModalOpen = (state: RootState) => state.map.isMapImageModalOpen;
export const selectIsMapFetching = (state: RootState) => state.map.isMapFetching;

export const {
    setMapContent,
    setIsMapImageModalOpen,
    toggleSelectedTagById,
    setSelectedTagIds,
    setIsMapContentImageFetching,
} = slice.actions;
export const mapReducer = slice.reducer;