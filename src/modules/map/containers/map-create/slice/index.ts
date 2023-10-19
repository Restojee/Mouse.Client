import { Map, Tag } from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { convertDataUrlToBlob } from '@/common/utils/convertDataUrlToBlob';
import { addMap } from '@/modules/map/containers/map-list/slice';
import { RootState } from '@/store';
import { MapCreateFormType } from '../containers/create-form/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const createMapThunk = createAsyncThunk('map/create', async (arg, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const name = selectMapName(state);
        const image = selectMapImage(state);
        const tags = selectMapTags(state);
        let map = await mapsApi.createMap({ name });

        if (map.id && tags) {
            await mapsApi.setMapsTag({ mapId: map.id, tagIds: tags as number[]});
            thunkAPI.dispatch(setMapTagIds([]))
        }

        if (map.id && image) {
            const file = convertDataUrlToBlob(image)
            map = await mapsApi.updateMapImage({ mapId: map.id, body: { file } });
        }

        thunkAPI.dispatch(addMap(map))
        thunkAPI.dispatch(setAppMessage({severity: 'success', text: `Карта добавлена`}))
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: `Ошибка добавления: ${error}`}))
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
        setMapTagIds: (state, action: PayloadAction<Tag['id'][]>) => {
            state.tags = action.payload;
        },
    },
});

export const selectMapName = (state: RootState) => state.mapCreate?.name;
export const selectMapImage = (state: RootState) => state.mapCreate?.image;
export const selectMapTags = (state: RootState) => state.mapCreate?.tags;

export const {
    setMapName,
    setMapImage,
    setMapTagIds,
} = slice.actions;

export const mapCreateReducer = slice.reducer;
