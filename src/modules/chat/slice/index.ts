import { Comment } from '@/api/codegen/genMouseMapsApi';
import { commentsApi } from '@/api/commentsApi';
import { setAppMessage } from '@/bll/appReducer';
import { ChatStateType } from '@/modules/chat/types';
import { addMapCommentsThunk } from '@/modules/map/containers/map-content/containers/comments/slice';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getChatMessagesThunk = createAsyncThunk('chat/get', async (arg, thunkAPI) => {
    try {
        const messages = await commentsApi.getCommentsByMapId({ levelId: 99 });
        thunkAPI.dispatch(setChatMessages(messages));
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка загрузки чата' }));
    }
});

export const addChatMessageThunk = createAsyncThunk('chat/create', async (arg: { text: string }, thunkAPI) => {
    try {
        const message = await commentsApi.addComment({ levelId: 99, text: arg.text });
        const state = thunkAPI.getState() as RootState;
        const user = state.auth.user;

        if (user) {
            thunkAPI.dispatch(addChatMessage({ ...message, user }));
        }

        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ text: `Ошибка добавления коммента`, severity: 'error' }));
        return thunkAPI.rejectWithValue(false);
    }
});

const initialState: ChatStateType = {
    messages: [],
    isCreateFetching: false,
    isMessagesInitialized: false,
};

const slice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatMessages: (state, action: PayloadAction<Comment[]>) => {
            state.messages = action.payload;
        },
        addChatMessage: (state, action: PayloadAction<Comment>) => {
            state.messages.push(action.payload);
        },
        setIsChatMessageCreateFetching: (state, action: PayloadAction<boolean>) => {
            state.isCreateFetching = action.payload;
        },
        setIsChatMessageInitialized: (state, action: PayloadAction<boolean>) => {
            state.isMessagesInitialized = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addMapCommentsThunk.pending, (state, action) => {
                state.isCreateFetching = true;
            })
            .addCase(addMapCommentsThunk.fulfilled, (state, action) => {
                state.isCreateFetching = false;
            })
            .addCase(addMapCommentsThunk.rejected, (state, action) => {
                state.isCreateFetching = false;
            });

    },

});

export const selectChatMessages = (state: RootState) => state.chat?.messages;
export const selectIsChatMessageInitialized = (state: RootState) => state.chat?.isMessagesInitialized;
export const selectIsChatMessageCreateFetching = (state: RootState) => state.chat?.isCreateFetching;

export const {
    setChatMessages,
    addChatMessage,
    setIsChatMessageCreateFetching,
    setIsChatMessageInitialized
} = slice.actions;
export const chatReducer = slice.reducer;