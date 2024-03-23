import { GetMapApiArg, GetMapsApiArg, GetMapsApiResponse, Map } from '@/api/codegen/genMouseMapsApi';
import { mapsApi } from '@/api/mapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { parseObjectValues } from '@/common/utils/parseObjectValues';
import { removeUndefinedKeys } from '@/common/utils/removeUndefinedKeys';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MapsStateType } from '../types';

const selectFilters = (state: RootState) => state.maps.filter;

export const getMapsThunk = createAsyncThunk('map/get', async (arg, { getState, dispatch }) => {
    try {
        const filters = selectFilters(getState() as RootState);
        const staticMapsData = await mapsApi.getMaps({ page: 1, size: 0 });
        const mapsData = await mapsApi.getMaps(filters);
        dispatch(setStaticMapsInfo(staticMapsData));
        dispatch(setMaps(mapsData));
        return mapsData;
    } catch (error) {
        dispatch(setAppMessage({ severity: 'error', text: `Ошибка загрузки карт` }));
    }
});
export const getMapByNameThunk = createAsyncThunk('map/get-by-name', async (arg: { name: string }, thunkAPI) => {
    try {
        const mapsData = await mapsApi.getMaps({
            name: arg.name,
            page: 1,
            size: 1,
            sortBy: 'DATE',
            sortDirection: 'DESC',
        });
        const map = mapsData.records[0];
        return thunkAPI.fulfillWithValue(map);
    } catch (error) {
        console.log(error);
    }
});

export const updateMapDataByIdThunk = createAsyncThunk('map/update-by-id', async (arg: GetMapApiArg, thunkAPI) => {
    try {
        const map = await mapsApi.getMapsById(arg);
        thunkAPI.dispatch(updateMapData(map));
    } catch (err) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: 'Ошибка обновления карты'}));
    }
})

const initialState: MapsStateType = {
    isMapsFetching: true,
    staticMapsInfo: null,
    mapsData: null,
    filter: {
        size: 100,
        page: 1,
        // sortBy: 'DATE',
        // sortDirection: 'DESC',
    },
};

const slice = createSlice({
    name: 'maps',
    initialState,
    reducers: {
        setMaps: (state, action: PayloadAction<GetMapsApiResponse>) => {
            state.mapsData = action.payload;
        },
        addMap: (state, action: PayloadAction<Map>) => {
            if (state.mapsData) {
                state.mapsData.records.unshift(action.payload);
            }
        },
        setFilter: (state, action: PayloadAction<Partial<GetMapsApiArg>>) => {
            let newFilter = parseObjectValues(action.payload) as GetMapsApiArg;

            if (Array.isArray(newFilter.tagIds)) {
                newFilter.tagIds = newFilter.tagIds.map(id => Number(id));
            } else if (newFilter.tagIds && !isNaN(newFilter.tagIds)) {
                newFilter.tagIds = [newFilter.tagIds];
            }
            state.filter = newFilter;
        },
        updateMapData: (state, action: PayloadAction<Map>) => {
            if (state.mapsData) {
                state.mapsData.records = state.mapsData.records.map((map) => {
                    if (map.id === action.payload.id) {
                        return action.payload;
                    }
                    return map;
                });
            }
        },
        updateFilter: (state, action: PayloadAction<Partial<GetMapsApiArg>>) => {
            let newFilter = { ...state.filter, ...parseObjectValues(action.payload) };
            if (Array.isArray(newFilter.tagIds)) {
                newFilter.tagIds = newFilter.tagIds.map(id => Number(id));
            } else if (newFilter.tagIds && !isNaN(newFilter.tagIds)) {
                newFilter.tagIds = [newFilter.tagIds];
            }

            state.filter = removeUndefinedKeys(newFilter);
        },
        deleteMap: (state, action: PayloadAction<Map['id']>) => {
            if (state.mapsData) {
                state.mapsData.records = state.mapsData.records.filter(el => el.id !== action.payload);
            }
        },
        setMapImageById: (state, action: PayloadAction<{ levelId: Map['id'], updatedMap: Map }>) => {
            if (state.mapsData) {
                state.mapsData.records = state.mapsData.records.map((map) => {
                    if (map.id === action.payload.levelId) {
                        return action.payload.updatedMap;
                    }
                    return map;
                });
            }
        },
        setStaticMapsInfo: (state, action: PayloadAction<GetMapsApiResponse>) => {
            state.staticMapsInfo = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getMapsThunk.pending, (state) => {
                state.isMapsFetching = true;
            })
            .addCase(getMapsThunk.fulfilled, (state) => {
                state.isMapsFetching = false;
            })
            .addCase(getMapsThunk.rejected, (state) => {
                state.isMapsFetching = false;
            });
    },
});

export const selectFilter = (state: RootState) => state.maps.filter;
export const selectMaps = (state: RootState) => state.maps.mapsData?.records;
export const selectIsMapsFetching = (state: RootState) => state.maps.isMapsFetching;
export const selectStaticMapsInfo = (state: RootState) => state.maps.staticMapsInfo;

export const {
    addMap,
    setMaps,
    deleteMap,
    setFilter,
    updateFilter,
    setMapImageById,
    setStaticMapsInfo,
    updateMapData
} = slice.actions;
export const mapsReducer = slice.reducer;
