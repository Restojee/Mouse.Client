import { MapCompleted, RemoveCompletedMapApiArg } from "@/api/codegen/genMouseMapsApi";
import { mapsApi } from "@/api/mapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { convertDataUrlToBlob } from "@/common/utils/convertDataUrlToBlob";
import { getMapByIdThunk } from "@/modules/map/containers/map-content/slice";
import { UpdateMapImageThunkArgType } from "@/modules/map/containers/map-content/types";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapCompletedStateType } from "../type";

export const addCompletedMapThunk = createAsyncThunk(
  "completed-maps/create",
  async (arg: UpdateMapImageThunkArgType, thunkAPI) => {
    try {
      const file = convertDataUrlToBlob(arg.file);

      if (arg.levelId) {
        await mapsApi.addCompletedMap({ levelId: arg.levelId, body: { file } });
        await thunkAPI.dispatch(getMapByIdThunk({ levelId: arg.levelId }));

        thunkAPI.dispatch(setAppMessage({ severity: "success", text: "Успешно добавлено" }));
      }
      return thunkAPI.fulfillWithValue(true);
    } catch (error) {
      thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка добавления" }));
      return thunkAPI.rejectWithValue(false);
    }
  },
);

export const deleteCompletedMapThunk = createAsyncThunk(
  "completed-maps/delete",
  async (arg: RemoveCompletedMapApiArg, thunkAPI) => {
    try {
      await mapsApi.removeCompletedMap(arg);

      thunkAPI.dispatch(getMapByIdThunk(arg));
      thunkAPI.dispatch(setAppMessage({ severity: "success", text: "Успешно удалено" }));
    } catch (error) {
      thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка удаления" }));
    }
  },
);

const initialState: MapCompletedStateType = {
  isModalOpen: false,
  completedMapsList: [],
  activeMapCompleted: null,
};
const slice = createSlice({
  name: "completed-maps",
  initialState,
  reducers: {
    setCompletedMaps: (state, action: PayloadAction<MapCompleted[]>) => {
      state.completedMapsList = action.payload;
    },
    setIsCompletedMapModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setActiveMapCompleted: (state, action: PayloadAction<MapCompleted | null>) => {
      state.activeMapCompleted = action.payload;
    },
  },
});

export const selectActiveMapCompleted = (state: RootState) => state.completedMaps?.activeMapCompleted;
export const selectCompletedMaps = (state: RootState) => state.completedMaps?.completedMapsList;
export const selectIsCompletedModalOpen = (state: RootState) => state.completedMaps?.isModalOpen;

export const { setCompletedMaps, setIsCompletedMapModalOpen, setActiveMapCompleted } = slice.actions;
export const completedMapsReducer = slice.reducer;
