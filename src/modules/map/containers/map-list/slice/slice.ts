import { GetMapsApiArg, GetMapsApiResponse, Map } from "@/api/codegen/genMouseMapsApi";
import { parseObjectValues } from "@/common/utils/parseObjectValues";
import { removeUndefinedKeys } from "@/common/utils/removeUndefinedKeys";
import { MapsStateType } from "@/modules/map/containers/map-list/types";
import {
  getMapsThunk,
  getModalMapsThunk,
  getMoreMapsThunk,
  getMoreModalMapsThunk,
} from "@/modules/map/containers/map-list/slice/thunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MapsStateType = {
  isMapsFetching: true,
  staticMapsInfo: null,
  mapsData: null,
  filter: {
    size: 40,
    page: 1,
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
