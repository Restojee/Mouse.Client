import { Comment, CreateCommentRequest, GetCommentsByMapIdApiArg } from '@/api/codegen/genMouseMapsApi';
import { commentsApi } from '@/api/commentsApi';
import { setAppMessage } from '@/bll/appReducer';
import { RootState } from '@/store';
import { MapCommentsStateType } from '../types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getMapCommentsThunk = createAsyncThunk('map-comments', async (arg: GetCommentsByMapIdApiArg, thunkAPI) => {
    try {
        const comments = await commentsApi.getCommentsByMapId({ mapId: arg.mapId });
        thunkAPI.dispatch(setComments(comments));
        thunkAPI.dispatch(setIsCommentsInitialized(true));
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: `Ошибка загрузки комментов: ${error}` }));
    }
});

export const addMapCommentsThunk = createAsyncThunk('map-comments/create', async (arg: CreateCommentRequest, thunkAPI) => {
    try {
        const { mapId, text } = arg;
        const comment = await commentsApi.addComment({ mapId, text });
        const state = thunkAPI.getState() as RootState;
        const user = state.auth.user;

        if (user) {
            thunkAPI.dispatch(addComment({ ...comment, user }));
        }

        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ text: `Ошибка добавления коммента, ${error}`, severity: 'error' }));
        return thunkAPI.rejectWithValue(false);
    }
});

const initialState: MapCommentsStateType = {
    commentsList: [],
    isCommentsInitialized: false,
    isCommentCreateFetching: false,
};
const slice = createSlice({
    name: 'map-comments',
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
    },
    extraReducers: builder => {
        builder
            .addCase(addMapCommentsThunk.pending, (state, action) => {
                state.isCommentCreateFetching = true;
            })
            .addCase(addMapCommentsThunk.fulfilled, (state, action) => {
                state.isCommentCreateFetching = false;
            })
            .addCase(addMapCommentsThunk.rejected, (state, action) => {
                state.isCommentCreateFetching = false;
            });
    },
});

export const selectMapComments = (state: RootState) => state.comments?.commentsList;
export const selectIsCommentsInitialized = (state: RootState) => state.comments?.isCommentsInitialized;
export const selectIsCommentCreateFetching = (state: RootState) => state.comments?.isCommentCreateFetching;

export const {
    setComments,
    addComment,
    setIsCommentsInitialized,
} = slice.actions;
export const mapCommentsReducer = slice.reducer;