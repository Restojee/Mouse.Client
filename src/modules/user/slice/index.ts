import { User } from '@/api/codegen/genMouseMapsApi';
import { usersApi } from '@/api/usersApi';
import { setAppMessage } from '@/bll/appReducer';
import { UsersStateType } from '@/modules/user/types';
import { RootState } from '@/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const getUsersThunk = createAsyncThunk('users/get', async (arg, thunkAPI) => {
    try {
        const users = await usersApi.getUsers();
        thunkAPI.dispatch(setUsers(users));
    } catch (error) {
        thunkAPI.dispatch(setAppMessage({ severity: 'error', text: 'Ошибка получения юзеров' }));
    }
});

const initialState: UsersStateType = {
    usersList: null,
};

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.usersList = action.payload;
        },
    },
});

export const selectUsers = (state: RootState) => state.users?.usersList;

export const {
    setUsers,
} = slice.actions;
export const usersReducer = slice.reducer;