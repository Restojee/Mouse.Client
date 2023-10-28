import { CreateTipApiArg, RemoveTipApiArg, Tip, UpdateTipApiArg } from '@/api/codegen/genMouseMapsApi';
import { infoApi } from '@/api/infoApi';
import { setAppMessage } from '@/bll/appReducer';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InfoStateType } from '../types';

export const getInfoThunk = createAsyncThunk('info/get', async (arg, thunkAPI) => {
    try {
        const infoList = await infoApi.getInfo();
        thunkAPI.dispatch(setInfo(infoList));
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка загрузки инфы' }));
    }
});

export const createInfoThunk = createAsyncThunk('info/create', async (arg: CreateTipApiArg, thunkAPI) => {
    try {
        await infoApi.createInfo(arg);
        thunkAPI.dispatch(getInfoThunk());
        thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Инфа добавлена' }));
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка добавления инфы' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const removeInfoThunk = createAsyncThunk('info/remove', async (arg: RemoveTipApiArg, thunkAPI) => {
    try {
        await infoApi.deleteInfo(arg);
        thunkAPI.dispatch(getInfoThunk());
        thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Инфа удалена' }));
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка удаления инфы' }));
        return thunkAPI.rejectWithValue(false);
    }
});

export const updateInfoThunk = createAsyncThunk('info/update', async (arg: UpdateTipApiArg, thunkAPI) => {
    try {
        await infoApi.updateInfo(arg);
        thunkAPI.dispatch(getInfoThunk());
        thunkAPI.dispatch(setAppMessage({ severity: 'success', text: 'Инфа обновлена' }));
        return thunkAPI.fulfillWithValue(true);
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка обновления инфы' }));
        return thunkAPI.rejectWithValue(false);
    }
});

const initialState: InfoStateType = {
    infoList: [],
    count: null,
    isCreateModalOpen: false,
    isInfoFetching: true,
    selectedInfo: null,
};

const slice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<Tip[]>) => {
            state.infoList = action.payload;
        },
        setIsCreateModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isCreateModalOpen = action.payload;
        },
        setSelectedInfo: (state, action: PayloadAction<Tip | null>) => {
            state.selectedInfo = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getInfoThunk.pending, (state) => {
                state.isInfoFetching = true;
            })
            .addCase(getInfoThunk.fulfilled, (state) => {
                state.isInfoFetching = false;
            })
            .addCase(getInfoThunk.rejected, (state) => {
                state.isInfoFetching = false;
            });
    },
});

export const selectInfoList = (state: RootState) => state.info.infoList;
export const selectIsInfoCreateModalOpen = (state: RootState) => state.info.isCreateModalOpen;
export const selectIsInfoFetching = (state: RootState) => state.info.isInfoFetching;
export const selectSelectedInfo = (state: RootState) => state.info.selectedInfo;

export const {
    setInfo,
    setIsCreateModalOpen,
    setSelectedInfo
} = slice.actions;

export const infoReducer = slice.reducer;