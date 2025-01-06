import { chatApi } from "@/api/chatApi";
import { Comment } from "@/api/codegen/genMouseMapsApi";
import { setAppMessage } from "@/bll/appReducer";
import { ChatStateType } from "@/modules/chat/types";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchChatMessagesThunk = createAsyncThunk("chat/get", async (arg, thunkAPI) => {
  try {
    const messages = await chatApi.getChatMessages({ size: 200, page: 1 });
    const fixedMessages = messages.records;

    thunkAPI.dispatch(setChatMessages(fixedMessages));
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка загрузки чата" }));
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
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ text: `Ошибка добавления коммента`, severity: "error" }));
    return thunkAPI.rejectWithValue(false);
  }
});

export const deleteChatMessageThunk = createAsyncThunk("chat/delete", async (arg: { messageId: number }, thunkAPI) => {
  try {
    await chatApi.deleteChatMessage({ messageId: arg.messageId });
    await thunkAPI.dispatch(fetchChatMessagesThunk());
    thunkAPI.dispatch(setAppMessage({ text: `Коммент успешно удален!`, severity: "success" }));
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ text: `Ошибка удаления коммента`, severity: "error" }));
  }
});

const initialState: ChatStateType = {
  messages: [],
  isCreateFetching: false,
  isMessagesInitialized: false,
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
    setIsChatMessageInitialized: (state, action: PayloadAction<boolean>) => {
      state.isMessagesInitialized = action.payload;
    },
  },
});

export const selectChatMessages = (state: RootState) => state.chat?.messages;
export const selectIsChatMessageInitialized = (state: RootState) => state.chat?.isMessagesInitialized;

export const { setChatMessages, addChatMessage } = slice.actions;
export const chatReducer = slice.reducer;
