import { Comment, CreateCommentRequest, GetCommentsByMapIdApiArg, Map } from "@/api/codegen/genMouseMapsApi";
import { commentsApi } from "@/api/commentsApi";
import { setAppMessage } from "@/bll/appReducer";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapCommentsStateType } from "../types";
import { AxiosError } from "axios";

export const fetchMapCommentsThunk = createAsyncThunk(
  "map-comments",
  async (arg: GetCommentsByMapIdApiArg, thunkAPI) => {
    try {
      const comments = await commentsApi.getCommentsByMapId({ levelId: arg.levelId });
      thunkAPI.dispatch(setComments(comments));
      thunkAPI.dispatch(setIsCommentsInitialized(true));
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return;
      }
      thunkAPI.dispatch(setAppMessage({ severity: "error", text: `Ошибка загрузки комментов` }));
    }
  },
);

export const addMapCommentsThunk = createAsyncThunk(
  "map-comments/create",
  async (arg: CreateCommentRequest, thunkAPI) => {
    try {
      const { levelId, text } = arg;
      const comment = await commentsApi.addComment({ levelId, text: text ?? "" });
      const state = thunkAPI.getState() as RootState;
      const user = state.auth.user;

      if (user) {
        thunkAPI.dispatch(addComment({ ...comment, user }));
      }

      return thunkAPI.fulfillWithValue(true);
    } catch (error) {
      thunkAPI.dispatch(setAppMessage({ text: `Ошибка добавления коммента`, severity: "error" }));
      return thunkAPI.rejectWithValue(false);
    }
  },
);

export const submitCommentThunk = createAsyncThunk("map-comments/submit", async (levelId: Map["id"], thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const commentText = state.comments.commentDraft.trim();
  if (!commentText.length) return;

  const res = await thunkAPI.dispatch(addMapCommentsThunk({ levelId, text: commentText }));
  if (res.payload) {
    thunkAPI.dispatch(setCommentDraft(""));
  }
});

export const deleteCommentGuardedThunk = createAsyncThunk(
  "map-comments/delete-guarded",
  async (arg: { comment: Comment; levelId: Map["id"] }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const user = state.auth?.user;
    if (!arg.comment.id || user?.id !== arg.comment.user?.id || !arg.levelId) return;
    await thunkAPI.dispatch(deleteMapCommentsThunk({ commentId: arg.comment.id, levelId: arg.levelId }));
  },
);

export const deleteMapCommentsThunk = createAsyncThunk(
  "map-comments/delete",
  async (arg: { commentId: Comment["id"]; levelId: Map["id"] }, thunkAPI) => {
    try {
      if (!arg.levelId) {
        return;
      }
      await commentsApi.deleteComment({ levelCommentId: arg.commentId });
      await thunkAPI.dispatch(fetchMapCommentsThunk({ levelId: arg.levelId }));

      thunkAPI.dispatch(setAppMessage({ text: `Коммент успешно удален`, severity: "success" }));
    } catch (error) {
      thunkAPI.dispatch(setAppMessage({ text: `Ошибка удаления коммента`, severity: "error" }));
    }
  },
);

const initialState: MapCommentsStateType = {
  commentsList: [],
  isCommentsInitialized: false,
  isCommentCreateFetching: false,
  commentDraft: "",
};
const slice = createSlice({
  name: "map-comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.commentsList = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.commentsList.push(action.payload);
    },
    setIsCommentsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isCommentsInitialized = action.payload;
    },
    setIsCommentCreateFetching: (state, action: PayloadAction<boolean>) => {
      state.isCommentsInitialized = action.payload;
    },
    setCommentDraft: (state, action: PayloadAction<string>) => {
      state.commentDraft = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMapCommentsThunk.pending, (state) => {
        state.isCommentCreateFetching = true;
      })
      .addCase(addMapCommentsThunk.fulfilled, (state) => {
        state.isCommentCreateFetching = false;
      })
      .addCase(addMapCommentsThunk.rejected, (state) => {
        state.isCommentCreateFetching = false;
      });
  },
});

export const selectMapComments = (state: RootState) => state.comments?.commentsList;
export const selectIsCommentsInitialized = (state: RootState) => state.comments?.isCommentsInitialized;
export const selectIsCommentCreateFetching = (state: RootState) => state.comments?.isCommentCreateFetching;
export const selectCommentDraft = (state: RootState) => state.comments?.commentDraft;

export const { setComments, addComment, setIsCommentsInitialized, setCommentDraft } = slice.actions;
export const mapCommentsReducer = slice.reducer;
