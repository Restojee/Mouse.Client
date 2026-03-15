import { CreateTagRequest, DeleteTagApiArg, Tag, UpdateTagApiArg } from "@/api/codegen/genMouseMapsApi";
import { tagsApi } from "@/api/tagsApi";
import { setAppMessage } from "@/bll/appReducer";
import { RootState } from "@/store";
import { TagModalTypes, TagsStateType } from "../types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const updateTagThunk = createAsyncThunk(
  "tag/update",
  async (arg: UpdateTagApiArg["updateTagRequest"], thunkAPI) => {
    try {
      await tagsApi.updateTag(arg);
      const tags = await tagsApi.getTags();
      thunkAPI.dispatch(setTags(tags));
      thunkAPI.dispatch(setAppMessage({ text: "Тег успешно изменен", severity: "success" }));
      return thunkAPI.fulfillWithValue(true);
    } catch (error) {
      thunkAPI.dispatch(setAppMessage({ text: "Ошибка изменения тега", severity: "error" }));
      return thunkAPI.rejectWithValue(false);
    }
  },
);

export const createTagThunk = createAsyncThunk("tag/create", async (arg: CreateTagRequest, thunkAPI) => {
  try {
    await tagsApi.createTag(arg);
    const tags = await tagsApi.getTags();
    thunkAPI.dispatch(setTags(tags));
    thunkAPI.dispatch(setAppMessage({ text: "Тег успешно добавлен", severity: "success" }));
    return thunkAPI.fulfillWithValue(true);
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ text: "Ошибка добавления тега", severity: "error" }));
    return thunkAPI.rejectWithValue(false);
  }
});

export const deleteTagThunk = createAsyncThunk("tag/delete", async (arg: DeleteTagApiArg, thunkAPI) => {
  try {
    await tagsApi.deleteTag(arg);
    const tags = await tagsApi.getTags();
    thunkAPI.dispatch(setTags(tags));
    thunkAPI.dispatch(setAppMessage({ text: "Тег успешно удален", severity: "success" }));
    return thunkAPI.fulfillWithValue(true);
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ text: "Ошибка удаления тега", severity: "error" }));
    return thunkAPI.rejectWithValue(false);
  }
});

export const getTagsThunk = createAsyncThunk("tag/get", async (arg, thunkAPI) => {
  try {
    const tags = await tagsApi.getTags();
    thunkAPI.dispatch(setTags(tags));
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ text: "Ошибка загрузки тегов", severity: "error" }));
  }
});

const initialState: TagsStateType = {
  modalType: null,
  tagsList: [],
};

const slice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTagModalType: (state, action: PayloadAction<TagModalTypes>) => {
      state.modalType = action.payload;
    },
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tagsList = [...action.payload].sort((a, b) => a.name.localeCompare(b.name));
    },
  },
});

export const selectTagModalType = (state: RootState) => state.tags.modalType;
export const selectTags = (state: RootState) => state.tags.tagsList;

export const { setTagModalType, setTags } = slice.actions;

export const tagsReducer = slice.reducer;
