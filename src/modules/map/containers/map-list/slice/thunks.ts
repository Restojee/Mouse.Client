import { GetMapApiArg, GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { mapsApi } from "@/api/mapsApi";
import { setAppMessage } from "@/bll/appReducer";
import {
  appendMaps,
  appendModalMaps,
  setMaps,
  setModalMaps,
  setStaticMapsInfo,
  updateMapData,
} from "@/modules/map/containers/map-list/slice/slice";
import { RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMapsThunk = createAsyncThunk("map/get", async (_: void, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    const filters = state.maps.filter;
    const hasStatic = Boolean(state.maps.staticMapsInfo);

    const requests: Array<Promise<unknown>> = [mapsApi.getMaps(filters)];
    if (!hasStatic) {
      requests.push(mapsApi.getMaps({ page: 1, size: filters.size }));
    }

    const [mapsData, staticMapsData] = (await Promise.all(requests)) as [
      Awaited<ReturnType<typeof mapsApi.getMaps>>,
      Awaited<ReturnType<typeof mapsApi.getMaps>>?,
    ];

    dispatch(setMaps(mapsData));
    if (staticMapsData) {
      dispatch(setStaticMapsInfo(staticMapsData));
    }

    return mapsData;
  } catch (error) {
    dispatch(setAppMessage({ severity: "error", text: `Ошибка загрузки карт` }));
  }
});

export const getMoreMapsThunk = createAsyncThunk("map/get-more", async (_: void, { getState, dispatch }) => {
  try {
    const state = getState() as RootState;
    const filters = state.maps.filter;
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
