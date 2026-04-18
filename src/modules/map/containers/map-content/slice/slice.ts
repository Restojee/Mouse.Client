import { Map, Tag } from "@/api/codegen/genMouseMapsApi";
import { getMapByIdThunk } from "@/modules/map/containers/map-content/slice/thunks";
import { MapContentStateType } from "@/modules/map/containers/map-content/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MapContentStateType = {
  isMapImageModalOpen: false,
  mapContent: null,
  isMapFetching: true,
  selectedModalTagIds: [],
  previewImageSrc: null,
};

const slice = createSlice({
  name: "map",
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
        state.selectedModalTagIds = state.selectedModalTagIds.filter((id) => id !== action.payload);
      } else {
        state.selectedModalTagIds.push(action.payload);
      }
    },
    setMapContentTags: (state, action: PayloadAction<Tag[]>) => {
      if (state.mapContent?.tags) {
        state.mapContent.tags = action.payload;
      }
    },
    setPreviewImageSrc: (state, action: PayloadAction<string | null>) => {
      state.previewImageSrc = action.payload;
    },
  },
  extraReducers: (builder) => {
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
  setPreviewImageSrc,
} = slice.actions;
export const mapReducer = slice.reducer;
