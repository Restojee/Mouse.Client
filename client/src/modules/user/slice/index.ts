import { GetUsersApiResponse, User } from "@/api/codegen/genMouseMapsApi";
import { usersApi } from "@/api/usersApi";
import { setAppMessage } from "@/bll/appReducer";
import { convertDataUrlToBlob } from "@/common/utils/convertDataUrlToBlob";
import { UsersStateType } from "@/modules/user/types";
import { filterTestUsers } from "@/modules/user/utils/filterTestUsers";
import { sortUsersByStatistic } from "@/modules/user/utils/sortUsersByStatistic";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getUsersThunk = createAsyncThunk("users/get", async (arg, thunkAPI) => {
  try {
    const users = await usersApi.getUsers({ page: 1, size: 100 });
    thunkAPI.dispatch(setUsers(users));
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка получения юзеров" }));
  }
});

export const updateUserImageThunk = createAsyncThunk("user/update-avatar", async (arg: { file: string }, thunkAPI) => {
  try {
    const file = convertDataUrlToBlob(arg.file);
    await usersApi.updateAvatar({ file });
    thunkAPI.dispatch(setAppMessage({ severity: "success", text: "Аватарка обновлена" }));
  } catch (error) {
    thunkAPI.dispatch(setAppMessage({ severity: "error", text: "Ошибка обновления аватарки" }));
  }
});

const initialState: UsersStateType = {
  users: null,
  openModalByUserId: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<GetUsersApiResponse>) => {
      state.users = action.payload;
      const filteredUsers = filterTestUsers(action.payload.records);

      state.users.records = sortUsersByStatistic(filteredUsers);
    },
    setOpenModalByUserId: (state, action: PayloadAction<User["id"] | null>) => {
      state.openModalByUserId = action.payload;
    },
  },
});

export const selectUsers = (state: RootState) => state.users?.users?.records;
export const selectOpenModalByUserId = (state: RootState) => state.users?.openModalByUserId;

export const { setUsers, setOpenModalByUserId } = slice.actions;
export const usersReducer = slice.reducer;
