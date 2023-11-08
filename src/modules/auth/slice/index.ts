import { authApi } from '@/api/authApi';
import { LoginRequest, User } from '@/api/codegen/genMouseMapsApi';
import { accessTokenProvider, refreshTokenProvider } from '@/services';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateType } from '../types';

export const refreshThunk = createAsyncThunk('refresh', async (arg, thunkAPI) => {

});

export const loginThunk = createAsyncThunk('auth/login', async (arg: LoginRequest, thunkAPI) => {
    try {
        const res = await authApi.login(arg);
        if (res.user.id) {
            thunkAPI.dispatch(setCurrentUser(res.user));
            thunkAPI.dispatch(setAuthStatus('authenticated'));
            accessTokenProvider.setToken(res.accessToken);
            refreshTokenProvider.setToken(res.refreshToken);
        }
        return thunkAPI.fulfillWithValue(true);
    } catch (err) {
        return thunkAPI.rejectWithValue(false);
    }
});

export const getCurrentUserThunk = createAsyncThunk('current-user', async (arg, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState;
        const currentUser = state.auth.user;
        const res = await authApi.getCurrentUser();
        if (res.id && res.id !== currentUser?.id) {
            thunkAPI.dispatch(setAuthStatus('authenticated'));
            thunkAPI.dispatch(setCurrentUser(res));
        }
    } catch (error) {
        thunkAPI.dispatch(setAuthStatus('unauthenticated'));
        thunkAPI.dispatch(setCurrentUser(null));
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
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCurrentUserThunk.rejected, (state, action) => {
                state.isAuth = false;
                state.user = null;
                state.status = 'unauthenticated';
            });
    },
});

export const selectIsAuth = (state: RootState) => state.auth?.isAuth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentUserId = (state: RootState) => state.auth.user?.id;

export const {
    setAuthStatus,
    setCurrentUser,
} = slice.actions;
export const authReducer = slice.reducer;