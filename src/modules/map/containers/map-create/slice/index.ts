import { Map, Tag } from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { convertDataUrlToBlob } from '@/common/utils/convertDataUrlToBlob';
import { getMapsThunk } from '@/modules/map/containers/map-list/slice';
import { RootState } from '@/store';
import { MapCreateFormType } from '../containers/create-form/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const createMapThunk = createAsyncThunk('map/create', async (arg: {id: Map['id']}, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const name = selectMapName(state);
        const image = selectMapImage(state);
        const completedMapImage = selectCompletedMapImage(state);
        const tags = selectMapTags(state);

        let levelId: Map['id'] = arg.id;
        let createdMap: Map;

        if (!levelId) {
            createdMap = await mapsApi.createMap({ name });
            levelId = createdMap.id
        }

        if (levelId && tags) {
            await mapsApi.setMapsTag({ levelId, tagIds: tags as number[] });
            thunkAPI.dispatch(setMapTagIds([]));
        }

        if (levelId && image) {
            const file = convertDataUrlToBlob(image);
            createdMap = await mapsApi.updateMapImage({ levelId, body: { file } });
        }

        if (levelId && completedMapImage) {
            const file = convertDataUrlToBlob(completedMapImage);
            await mapsApi.addCompletedMap({ levelId, body: { file } });
        }

        thunkAPI.dispatch(getMapsThunk())

        if(arg.id) {
            thunkAPI.dispatch(setAppMessage({ severity: 'success', text: `Существующая карта обновлена` }));
        } else {
            thunkAPI.dispatch(setAppMessage({ severity: 'success', text: `Карта добавлена` }));
        }
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: `Ошибка добавления` }));
    }
});

const initialState: MapCreateFormType = {
    name: '',
};

const slice = createSlice({
    name: 'map-create',
    initialState,
    reducers: {
        setMapName: (state, action: PayloadAction<Map['name']>) => {
            state.name = action.payload;
        },
        setMapImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        setCompletedMapImage: (state, action: PayloadAction<Map['image']>) => {
            state.completedMapImage = action.payload;
        },
        setMapTagIds: (state, action: PayloadAction<Tag['id'][]>) => {
            state.tags = action.payload;
        },
    },
});

export const selectMapName = (state: RootState) => state.mapCreate?.name;
export const selectMapImage = (state: RootState) => state.mapCreate?.image;
export const selectCompletedMapImage = (state: RootState) => state.mapCreate?.completedMapImage;
export const selectMapTags = (state: RootState) => state.mapCreate?.tags;

export const {
    setMapName,
    setMapImage,
    setMapTagIds,
    setCompletedMapImage,
} = slice.actions;

export const mapCreateReducer = slice.reducer;
