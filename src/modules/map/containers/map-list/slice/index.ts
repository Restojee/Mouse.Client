import { GetMapApiArg, GetMapsApiArg, GetMapsApiResponse, Map } from "@/api/codegen/genMouseMapsApi";
import { mapsApi } from "@/api/mapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { parseObjectValues } from "@/common/utils/parseObjectValues";
import { removeUndefinedKeys } from "@/common/utils/removeUndefinedKeys";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapsStateType } from "../types";

const selectFilters = (state: RootState) => state.maps.filter;

export const getMapsThunk = createAsyncThunk("map/get", async (arg, { getState, dispatch }) => {
  try {
    const filters = selectFilters(getState() as RootState);

    const [staticMapsData, mapsData] = await Promise.all([
      mapsApi.getMaps({ page: 1, size: filters.size }),
      mapsApi.getMaps({ ...filters, page: 1 }),
    ]);

    dispatch(setStaticMapsInfo(staticMapsData));
    dispatch(setMaps(mapsData));

    return mapsData;
  } catch (error) {
    dispatch(setAppMessage({ severity: "error", text: `Ошибка загрузки карт` }));
  }
});

export const getMoreMapsThunk = createAsyncThunk("map/get-more", async (arg, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    const filters = selectFilters(state);
    const mapsData = state.maps.mapsData;

    if (!mapsData || mapsData.page >= mapsData.totalPages) return;

    const nextPage = mapsData.page + 1;
    const data = await mapsApi.getMaps({ ...filters, size: 40, page: nextPage });

    dispatch(appendMaps(data));
    return data;
  } catch (error) {
    dispatch(setAppMessage({ severity: "error", text: `Ошибка загрузки карт` }));
  }
});
export const getMapByNameThunk = createAsyncThunk("map/get-by-name", async (arg: { name: string }, thunkAPI) => {
  try {
    const mapsData = await mapsApi.getMaps({
      name: arg.name,
      page: 1,
      size: 1,
      sortBy: "DATE",
      sortDirection: "DESC",
    });
    const map = mapsData.records[0];
    return thunkAPI.fulfillWithValue(map);
  } catch (error) {
    console.log(error);
  }
});

export const getModalMapsThunk = createAsyncThunk("map/modal-get", async (filter: GetMapsApiArg, { dispatch }) => {
  try {
    const data = await mapsApi.getMaps({ ...filter, page: 1 });
    dispatch(setModalMaps(data));
    return data;
  } catch (error) {
    dispatch(setAppMessage({ severity: "error", text: "Ошибка загрузки карт" }));
  }
});

export const getMoreModalMapsThunk = createAsyncThunk(
  "map/modal-get-more",
  async (filter: GetMapsApiArg, { getState, dispatch }) => {
    try {
      const state = getState() as RootState;
      const modalData = state.maps.modalMapsData;
      if (!modalData || modalData.page >= modalData.totalPages) return;
      const data = await mapsApi.getMaps({ ...filter, page: modalData.page + 1 });
      dispatch(appendModalMaps(data));
      return data;
    } catch (error) {
      dispatch(setAppMessage({ severity: "error", text: "Ошибка загрузки карт" }));
    }
  },
);

export const updateMapDataByIdThunk = createAsyncThunk("map/update-by-id", async (arg: GetMapApiArg, thunkAPI) => {
  try {
    const map = await mapsApi.getMapsById(arg);
    thunkAPI.dispatch(updateMapData(map));
  } catch (err) {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка обновления карты" }));
  }
});

const initialState: MapsStateType = {
  isMapsFetching: true,
  staticMapsInfo: null,
  mapsData: null,
  filter: {
    size: 40,
    page: 1,
    // sortBy: 'DATE',
    // sortDirection: 'DESC',
  },
  modalMapsData: null,
  isModalMapsFetching: false,
};

const slice = createSlice({
  name: "maps",
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
      const newFilter = parseObjectValues(action.payload) as GetMapsApiArg;

      if (Array.isArray(newFilter.tagIds)) {
        newFilter.tagIds = newFilter.tagIds.map((id) => Number(id));
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
      const newFilter = { ...state.filter, ...parseObjectValues(action.payload) };
      if (Array.isArray(newFilter.tagIds)) {
        newFilter.tagIds = newFilter.tagIds.map((id) => Number(id));
      } else if (newFilter.tagIds && !isNaN(newFilter.tagIds)) {
        newFilter.tagIds = [newFilter.tagIds];
      }

      state.filter = removeUndefinedKeys(newFilter);
    },
    deleteMap: (state, action: PayloadAction<Map["id"]>) => {
      if (state.mapsData) {
        state.mapsData.records = state.mapsData.records.filter((el) => el.id !== action.payload);
      }
    },
    setMapImageById: (state, action: PayloadAction<{ levelId: Map["id"]; updatedMap: Map }>) => {
      if (state.mapsData) {
        state.mapsData.records = state.mapsData.records.map((map) => {
          if (map.id === action.payload.levelId) {
            return action.payload.updatedMap;
          }
          return map;
        });
      }
    },
    appendMaps: (state, action: PayloadAction<GetMapsApiResponse>) => {
      if (state.mapsData) {
        state.mapsData.records = [...state.mapsData.records, ...action.payload.records];
        state.mapsData.page = action.payload.page;
        state.mapsData.totalPages = action.payload.totalPages;
        state.mapsData.totalItems = action.payload.totalItems;
      }
    },
    setStaticMapsInfo: (state, action: PayloadAction<GetMapsApiResponse>) => {
      state.staticMapsInfo = action.payload;
    },
    setModalMaps: (state, action: PayloadAction<GetMapsApiResponse>) => {
      state.modalMapsData = action.payload;
    },
    appendModalMaps: (state, action: PayloadAction<GetMapsApiResponse>) => {
      if (state.modalMapsData) {
        state.modalMapsData.records = [...state.modalMapsData.records, ...action.payload.records];
        state.modalMapsData.page = action.payload.page;
        state.modalMapsData.totalPages = action.payload.totalPages;
        state.modalMapsData.totalItems = action.payload.totalItems;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMapsThunk.pending, (state) => {
        state.isMapsFetching = true;
      })
      .addCase(getMapsThunk.fulfilled, (state) => {
        state.isMapsFetching = false;
      })
      .addCase(getMapsThunk.rejected, (state) => {
        state.isMapsFetching = false;
      })
      .addCase(getMoreMapsThunk.pending, (state) => {
        state.isMapsFetching = true;
      })
      .addCase(getMoreMapsThunk.fulfilled, (state) => {
        state.isMapsFetching = false;
      })
      .addCase(getMoreMapsThunk.rejected, (state) => {
        state.isMapsFetching = false;
      })
      .addCase(getModalMapsThunk.pending, (state) => {
        state.isModalMapsFetching = true;
      })
      .addCase(getModalMapsThunk.fulfilled, (state) => {
        state.isModalMapsFetching = false;
      })
      .addCase(getModalMapsThunk.rejected, (state) => {
        state.isModalMapsFetching = false;
      })
      .addCase(getMoreModalMapsThunk.pending, (state) => {
        state.isModalMapsFetching = true;
      })
      .addCase(getMoreModalMapsThunk.fulfilled, (state) => {
        state.isModalMapsFetching = false;
      })
      .addCase(getMoreModalMapsThunk.rejected, (state) => {
        state.isModalMapsFetching = false;
      });
  },
});

export const selectFilter = (state: RootState) => state.maps.filter;
export const selectMaps = (state: RootState) => state.maps.mapsData?.records;
export const selectIsMapsFetching = (state: RootState) => state.maps.isMapsFetching;
export const selectStaticMapsInfo = (state: RootState) => state.maps.staticMapsInfo;
export const selectMapsInfo = (state: RootState) => state.maps.mapsData;
export const selectModalMaps = (state: RootState) => state.maps.modalMapsData?.records;
export const selectIsModalMapsFetching = (state: RootState) => state.maps.isModalMapsFetching;
export const selectModalMapsInfo = (state: RootState) => state.maps.modalMapsData;

export const {
  addMap,
  setMaps,
  appendMaps,
  deleteMap,
  setFilter,
  updateFilter,
  setMapImageById,
  setStaticMapsInfo,
  updateMapData,
  setModalMaps,
  appendModalMaps,
} = slice.actions;
export const mapsReducer = slice.reducer;
