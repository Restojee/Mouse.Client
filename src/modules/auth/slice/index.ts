import { authApi } from '@/api/authApi';
import { User } from '@/api/codegen/genMouseMapsApi';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateType } from '../types';

export const getCurrentUserThunk = createAsyncThunk('current-user', async (arg, thunkAPI) => {
    try {
        const res = await authApi.getCurrentUser();

        if (res.id) {
            thunkAPI.dispatch(setAuthStatus('authenticated'));
            thunkAPI.dispatch(setCurrentUser(res));
        }
    } catch (error) {
        console.log(`Ошибка получения данных о юзере, ${error}`);
    }
});

const initialState: AuthStateType = {
    status: null,
    user: null,
    isAuth: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthStatus: (state, action: PayloadAction<AuthStateType['status']>) => {
            state.status = action.payload;
            state.isAuth = action.payload === 'authenticated';
        },
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

export const selectIsAuth = (state: RootState) => state.auth?.isAuth;
export const selectCurrentUser = (state: RootState) => state.auth.user;

export const {
    setAuthStatus,
    setCurrentUser,
} = slice.actions;
export const authReducer = slice.reducer;