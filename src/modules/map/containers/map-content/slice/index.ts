import {
    AddFavoriteMapApiArg,
    DeleteMapApiArg,
    GetMapApiArg,
    Map, RemoveFavoriteMapApiArg,
    Tag,
    UpdateMapImageApiArg,
} from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage, setAppModalType } from '@/bll/appReducer';
import { convertDataUrlToBlob } from '@/common/utils/convertDataUrlToBlob';
import {
    getMapCommentsThunk,
    setComments,
    setIsCommentsInitialized,
} from '@/modules/map/containers/map-content/containers/comments/slice';
import { setMapNote } from '@/modules/map/containers/map-content/containers/note/slice';
import {
    setActiveMapCompletedById,
    setCompletedMaps,
} from '../containers/completed-images/slice';
import {
    deleteMap,
    getMapsThunk,
    setMapImageById,
    updateMapDataByIdThunk,
} from '@/modules/map/containers/map-list/slice';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapContentStateType, UpdateMapImageThunkArgType } from '../types';

let mapByIdAbortController = new AbortController();

export const onOpenMapContentThunk = createAsyncThunk('map/open-map', async (arg: { levelId: Map['id'] }, thunkAPI) => {
    mapByIdAbortController = new AbortController();
    try {
        if (arg?.levelId) {
            const levelId = arg.levelId;
            thunkAPI.dispatch(getMapByIdThunk({ levelId }));
            thunkAPI.dispatch(getMapCommentsThunk({ levelId }));
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
        thunkAPI.dispatch(deleteMap(arg.levelId));
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
        thunkAPI.dispatch(setIsFavorite(true))
        thunkAPI.dispatch(increaseFavoriteCount())
        thunkAPI.dispatch(updateMapDataByIdThunk({levelId: arg.levelId}));
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка добавления в избранное' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const removeFavorite = createAsyncThunk('map/favorite', async (arg: RemoveFavoriteMapApiArg, thunkAPI) => {
    try {
        await mapsApi.removeFavorite(arg);
        thunkAPI.dispatch(getMapsThunk());
        thunkAPI.dispatch(decreaseFavoriteCount())
        thunkAPI.dispatch(setIsFavorite(false));
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка удаления из избранного' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const getMapByIdThunk = createAsyncThunk('map/get-by-id', async (arg: GetMapApiArg, thunkAPI) => {
    try {
        const map = await mapsApi.getMapsById({ levelId: arg.levelId }, mapByIdAbortController.signal);
        const tagIds = map.tags?.map(el => el.id as number) || [];
        thunkAPI.dispatch(setMapContent(map));
        thunkAPI.dispatch(setCompletedMaps(map.completed || []));
        thunkAPI.dispatch(setMapNote(map.notes[0].text));
        thunkAPI.dispatch(setSelectedTagIds(tagIds));
        return thunkAPI.fulfillWithValue(map);

    } catch (error) {
        return thunkAPI.rejectWithValue(null);
    }
});

export const updateMapImageThunk = createAsyncThunk('map/update-image', async (arg: UpdateMapImageThunkArgType, thunkAPI) => {
    try {
        const file = convertDataUrlToBlob(arg.file);
        if (file && arg.levelId) {
            await mapsApi.updateMapImage({ levelId: arg.levelId, body: { file } });
            await thunkAPI.dispatch(getMapByIdThunk({ levelId: arg.levelId }));
            
            thunkAPI.dispatch(updateMapDataByIdThunk({ levelId: arg.levelId }));
            thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Обложка обновлена' }));
            return thunkAPI.fulfillWithValue(true);
        }
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка обновления обложки' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const updateMapTagsThunk = createAsyncThunk('tag/set-map-tags', async (levelId: Map['id'], thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const tagIds = state.map.selectedModalTagIds;
        if (tagIds) {
            const map = await mapsApi.setMapsTag({ levelId, tagIds });
            thunkAPI.dispatch(setAppModalType(null));
            thunkAPI.dispatch(setMapContentTags(map.tags || []));
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
        setIsFavorite: (state, action: PayloadAction<boolean>) => {
            if (state.mapContent) {
                state.mapContent.isFavoriteByUser = action.payload;
            }
        },
        decreaseFavoriteCount: (state) => {
            if (state.mapContent) {
                state.mapContent.favoritesCount--;
            }
        },
        increaseFavoriteCount: (state) => {
            if (state.mapContent) {
                state.mapContent.favoritesCount++;
            }
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
            if (state.mapContent?.tags) {
                state.mapContent.tags = action.payload;
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
    setMapContentTags,
    setIsFavorite,
    decreaseFavoriteCount,
    increaseFavoriteCount,
} = slice.actions;
export const mapReducer = slice.reducer;