import { Comment, CreateCommentRequest, GetCommentsByMapIdApiArg } from '@/api/codegen/genMouseMapsApi';
import { commentsApi } from '@/api/commentsApi';
import { RootState } from '@/store';
import { MapCommentsStateType } from '../types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getMapCommentsThunk = createAsyncThunk('map-comments', async (arg: GetCommentsByMapIdApiArg, thunkAPI) => {
    try {
        const comments = await commentsApi.getCommentsByMapId({ mapId: arg.mapId });
        thunkAPI.dispatch(setComments(comments));
    } catch (error) {
        return console.log(`Ошибка загрузки комментов ${error}`);
    }
});

export const addMapCommentsThunk = createAsyncThunk('map-comments', async (arg: CreateCommentRequest, thunkAPI) => {
    try {
        const { mapId, text } = arg;
        const comment = await commentsApi.addComment({ mapId, text });
        thunkAPI.dispatch(addComment(comment));
        console.log('addComment', comment)
    } catch (error) {
        return console.log(`Ошибка добавления коммента, ${error}`);
    }
});

const initialState: MapCommentsStateType = {
    commentsList: [],
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
    },
});

export const selectMapComments = (state: RootState) => state.comments?.commentsList;

export const {
    setComments,
    addComment
} = slice.actions;
export const mapCommentsReducer = slice.reducer;