import {
  AddFavoriteMapApiArg,
  DeleteMapApiArg,
  GetMapApiArg,
  Map,
  RemoveFavoriteMapApiArg,
  UpdateMapApiArg,
} from "@/api/codegen/genMouseMapsApi";
import { mapsApi } from "@/api/mapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { convertDataUrlToBlob } from "@/common/utils/convertDataUrlToBlob";
import {
  setActiveMapCompleted,
  setCompletedMaps,
} from "@/modules/map/containers/map-content/containers/completed-images/slice";
import {
  fetchMapCommentsThunk,
  setCommentDraft,
  setComments,
  setIsCommentsInitialized,
} from "@/modules/map/containers/map-content/containers/comments/slice";
import { setMapNote } from "@/modules/map/containers/map-content/containers/note/slice";
import {
  decreaseFavoriteCount,
  increaseFavoriteCount,
  setIsFavorite,
  setIsMapContentImageFetching,
  setMapContent,
  setMapContentTags,
  setPreviewImageSrc,
  setSelectedTagIds,
} from "@/modules/map/containers/map-content/slice/slice";
import { UpdateMapImageThunkArgType } from "@/modules/map/containers/map-content/types";
import { deleteMap, getMapsThunk, updateMapDataByIdThunk } from "@/modules/map/containers/map-list/slice";
import { RootState } from "@/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

let mapByIdAbortController = new AbortController();

export const onOpenMapContentThunk = createAsyncThunk("map/open-map", async (arg: { levelId: Map["id"] }, thunkAPI) => {
  mapByIdAbortController = new AbortController();
  try {
    if (arg?.levelId) {
      const levelId = arg.levelId;
      thunkAPI.dispatch(getMapByIdThunk({ levelId }));
      thunkAPI.dispatch(fetchMapCommentsThunk({ levelId }));
    }
  } catch (error) {
    console.log(error);
  }
});

export const onCloseMapContentThunk = createAsyncThunk("map/close-map", async (_: void, thunkAPI) => {
  mapByIdAbortController.abort();
  try {
    thunkAPI.dispatch(setCompletedMaps([]));
    thunkAPI.dispatch(setSelectedTagIds([]));
    thunkAPI.dispatch(setActiveMapCompleted(null));
    thunkAPI.dispatch(setIsMapContentImageFetching(true));
    thunkAPI.dispatch(setMapContent(null));
    thunkAPI.dispatch(setMapNote(""));
    thunkAPI.dispatch(setComments([]));
    thunkAPI.dispatch(setIsCommentsInitialized(false));
    thunkAPI.dispatch(setCommentDraft(""));
    thunkAPI.dispatch(setPreviewImageSrc(null));
  } catch (error) {
    console.log(error);
  }
});

export const deleteMapThunk = createAsyncThunk("map/delete", async (arg: DeleteMapApiArg, thunkAPI) => {
  try {
    await mapsApi.deleteMap(arg);
    thunkAPI.dispatch(deleteMap(arg.levelId));
    thunkAPI.dispatch(setMapContent(null));
    thunkAPI.dispatch(setAppMessage({ severity: "success", text: "Удалено" }));
    return thunkAPI.fulfillWithValue(true);
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка удаления" }));
    return thunkAPI.rejectWithValue(false);
  }
});

export const addFavorite = createAsyncThunk("map/favorite", async (arg: AddFavoriteMapApiArg, thunkAPI) => {
  try {
    await mapsApi.addFavorite(arg);
    thunkAPI.dispatch(setIsFavorite(true));
    thunkAPI.dispatch(increaseFavoriteCount());
    thunkAPI.dispatch(updateMapDataByIdThunk({ levelId: arg.levelId }));
    return thunkAPI.fulfillWithValue(true);
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка добавления в избранное" }));
    return thunkAPI.rejectWithValue(false);
  }
});

export const removeFavorite = createAsyncThunk("map/favorite", async (arg: RemoveFavoriteMapApiArg, thunkAPI) => {
  try {
    await mapsApi.removeFavorite(arg);
    thunkAPI.dispatch(getMapsThunk());
    thunkAPI.dispatch(decreaseFavoriteCount());
    thunkAPI.dispatch(setIsFavorite(false));
    return thunkAPI.fulfillWithValue(true);
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка удаления из избранного" }));
    return thunkAPI.rejectWithValue(false);
  }
});

export const getMapByIdThunk = createAsyncThunk("map/get-by-id", async (arg: GetMapApiArg, thunkAPI) => {
  try {
    const map = await mapsApi.getMapsById({ levelId: arg.levelId }, mapByIdAbortController.signal);
    const tagIds = map.tags?.map((el) => el.id as number) || [];

    thunkAPI.dispatch(setMapContent(map));

    thunkAPI.dispatch(setSelectedTagIds(tagIds));
    thunkAPI.dispatch(setCompletedMaps(map.completed || []));

    const note = map.notes[0]?.text;

    if (note) {
      thunkAPI.dispatch(setMapNote(map.notes[0].text));
    } else {
      thunkAPI.dispatch(setMapNote(""));
    }

    return thunkAPI.fulfillWithValue(map);
  } catch (error) {
    return thunkAPI.rejectWithValue(null);
  }
});

export const updateMapImageThunk = createAsyncThunk(
  "map/update-image",
  async (arg: UpdateMapImageThunkArgType, thunkAPI) => {
    try {
      const file = convertDataUrlToBlob(arg.file);
      if (file && arg.levelId) {
        await mapsApi.updateMapImage({ levelId: arg.levelId, body: { file } });
        await thunkAPI.dispatch(getMapByIdThunk({ levelId: arg.levelId }));

        thunkAPI.dispatch(updateMapDataByIdThunk({ levelId: arg.levelId }));
        thunkAPI.dispatch(setAppMessage({ severity: "success", text: "Обложка обновлена" }));
        return thunkAPI.fulfillWithValue(true);
      }
    } catch (error) {
      thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка обновления обложки" }));
      return thunkAPI.rejectWithValue(false);
    }
  },
);

export const updateMapTagsThunk = createAsyncThunk("tag/set-map-tags", async (levelId: Map["id"], thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const tagIds = state.map.selectedModalTagIds;
    if (tagIds) {
      const map = await mapsApi.setMapsTag({ levelId, tagIds });
      thunkAPI.dispatch(setMapContentTags(map.tags || []));
    }
    thunkAPI.dispatch(setAppMessage({ text: "Теги успешно добавлены", severity: "success" }));
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ text: "Ошибка добавления тегов", severity: "error" }));
  }
});

export const openPreviewImageThunk = createAsyncThunk("map/open-preview-image", (src: string, thunkAPI) => {
  thunkAPI.dispatch(setPreviewImageSrc(src));
});

export const closePreviewImageThunk = createAsyncThunk("map/close-preview-image", (_: void, thunkAPI) => {
  thunkAPI.dispatch(setPreviewImageSrc(null));
});

export const copyTextThunk = createAsyncThunk("map/copy-text", async (text: string, thunkAPI) => {
  try {
    await navigator.clipboard.writeText(text);
    thunkAPI.dispatch(setAppMessage({ severity: "success", text: "Скопировано" }));
  } catch {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка копирования" }));
  }
});

export const toggleMapFavoriteThunk = createAsyncThunk(
  "map/toggle-favorite",
  (arg: { levelId: Map["id"]; isFavorite: boolean }, thunkAPI) => {
    if (!arg.isFavorite) {
      thunkAPI.dispatch(addFavorite({ levelId: arg.levelId! }));
    } else {
      thunkAPI.dispatch(removeFavorite({ levelId: arg.levelId! }));
    }
  },
);

export const updateMapNameThunk = createAsyncThunk("map/update-name", async (arg: UpdateMapApiArg, thunkAPI) => {
  try {
    if (!arg?.id || !arg?.name) {
      return thunkAPI.rejectWithValue(false);
    }
    await mapsApi.updateMap(arg);
    const levelId = arg.id;
    await thunkAPI.dispatch(getMapByIdThunk({ levelId }));
    thunkAPI.dispatch(updateMapDataByIdThunk({ levelId }));
    thunkAPI.dispatch(setAppMessage({ severity: "success", text: "Название обновлено" }));
    return thunkAPI.fulfillWithValue(true);
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка обновления названия" }));
    return thunkAPI.rejectWithValue(false);
  }
});
