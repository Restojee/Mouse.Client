import { UpdateMapNoteRequest } from '@/api/codegen/genMouseMapsApi';
import { noteApi } from '@/api/noteApi';
import { setAppMessage } from '@/bll/appReducer';
import { RootState } from '@/store';
import { MapNoteStateType } from '../types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const saveMapNoteThunk = createAsyncThunk('map-note/put', async (arg: UpdateMapNoteRequest, thunkAPI) => {
    try {
        await noteApi.updateNote(arg);
        thunkAPI.dispatch(setMapNote(arg.text));
        thunkAPI.dispatch(setAppMessage({severity: 'success', text: 'Заметка сохранена'}))
    } catch (err) {
        thunkAPI.dispatch(setAppMessage({severity: 'error', text: 'Ошибка сохранения заметки'}))
    }
});

const initialState: MapNoteStateType = {
    note: '',
};

const slice = createSlice({
    name: 'map-note',
    initialState,
    reducers: {
        setMapNote: (state, action: PayloadAction<string>) => {
            state.note = action.payload;
        },
    },
});

export const selectMapNote = (state: RootState) => state.mapNote?.note;

export const {
    setMapNote,
} = slice.actions;

export const mapNoteReducer = slice.reducer;