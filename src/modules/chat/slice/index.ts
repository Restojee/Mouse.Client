import { chatApi } from "@/api/chatApi";
import { Comment } from "@/api/codegen/genMouseMapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { ChatStateType } from "@/modules/chat/types";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const CHAT_PAGE_SIZE = 15;

export const initChatMessagesThunk = createAsyncThunk("chat/init", async (_, thunkAPI) => {
  try {
    const response = await chatApi.getChatMessages({ size: CHAT_PAGE_SIZE, page: 1 });
    const { records, totalPages } = response;
    return { messages: [...records].reverse(), totalPages };
  } catch {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка загрузки чата" }));
    return thunkAPI.rejectWithValue(null);
  }
});

export const pollNewMessagesThunk = createAsyncThunk("chat/poll", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const existingIds = new Set(state.chat.messages.map((m) => m.id));
    const response = await chatApi.getChatMessages({ size: CHAT_PAGE_SIZE, page: 1 });
    const freshMessages = response.records.filter((m) => !existingIds.has(m.id));
    return freshMessages.length > 0 ? [...freshMessages].reverse() : [];
  } catch {
    return thunkAPI.rejectWithValue(null);
  }
});

export const fetchOlderMessagesThunk = createAsyncThunk("chat/loadOlder", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const nextPage = state.chat.oldestLoadedPage + 1;
    const response = await chatApi.getChatMessages({ size: CHAT_PAGE_SIZE, page: nextPage });
    const { records, totalPages } = response;
    const olderMessages = [...records].reverse();
    return { messages: olderMessages, nextPage, hasMore: nextPage < totalPages };
  } catch {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка загрузки сообщений" }));
    return thunkAPI.rejectWithValue(null);
  }
});

export const addChatMessageThunk = createAsyncThunk("chat/create", async (arg: { text: string }, thunkAPI) => {
  try {
    const message = await chatApi.addChatMessage({ text: arg.text });
    const state = thunkAPI.getState() as RootState;
    const user = state.auth.user;
    if (user) {
      thunkAPI.dispatch(addChatMessage({ ...message, user }));
    }
    return thunkAPI.fulfillWithValue(true);
  } catch {
    thunkAPI.dispatch(setAppMessage({ text: "Ошибка добавления коммента", severity: "error" }));
    return thunkAPI.rejectWithValue(false);
  }
});

export const deleteChatMessageThunk = createAsyncThunk("chat/delete", async (arg: { messageId: number }, thunkAPI) => {
  try {
    await chatApi.deleteChatMessage({ messageId: arg.messageId });
    thunkAPI.dispatch(removeChatMessage(arg.messageId));
    thunkAPI.dispatch(setAppMessage({ text: "Коммент успешно удален!", severity: "success" }));
  } catch {
    thunkAPI.dispatch(setAppMessage({ text: "Ошибка удаления коммента", severity: "error" }));
  }
});

const initialState: ChatStateType = {
  messages: [],
  isCreateFetching: false,
  isMessagesInitialized: false,
  isLoadingOlder: false,
  hasMoreOlder: false,
  oldestLoadedPage: 1,
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatMessages: (state, action: PayloadAction<Comment[]>) => {
      state.messages = action.payload;
    },
    addChatMessage: (state, action: PayloadAction<Comment>) => {
      state.messages.push(action.payload);
    },
    removeChatMessage: (state, action: PayloadAction<number>) => {
      state.messages = state.messages.filter((m) => m.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initChatMessagesThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.messages = action.payload.messages;
        state.hasMoreOlder = action.payload.totalPages > 1;
        state.oldestLoadedPage = 1;
        state.isMessagesInitialized = true;
      }
    });

    builder.addCase(pollNewMessagesThunk.fulfilled, (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.messages.push(...action.payload);
      }
    });

    builder.addCase(fetchOlderMessagesThunk.pending, (state) => {
      state.isLoadingOlder = true;
    });
    builder.addCase(fetchOlderMessagesThunk.fulfilled, (state, action) => {
      state.isLoadingOlder = false;
      if (action.payload) {
        state.messages = [...action.payload.messages, ...state.messages];
        state.oldestLoadedPage = action.payload.nextPage;
        state.hasMoreOlder = action.payload.hasMore;
      }
    });
    builder.addCase(fetchOlderMessagesThunk.rejected, (state) => {
      state.isLoadingOlder = false;
    });
  },
});

export const selectChatMessages = (state: RootState) => state.chat?.messages;
export const selectIsChatMessageInitialized = (state: RootState) => state.chat?.isMessagesInitialized;
export const selectIsLoadingOlderMessages = (state: RootState) => state.chat?.isLoadingOlder;
export const selectHasMoreOlderMessages = (state: RootState) => state.chat?.hasMoreOlder;

export const { setChatMessages, addChatMessage, removeChatMessage } = slice.actions;
export const chatReducer = slice.reducer;
