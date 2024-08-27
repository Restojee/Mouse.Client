import { ThemeKey } from "@/layout/theme/types";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAppMessage = {
  id: string;
  severity: "error" | "success";
  text: string;
};

export type AppModalTypes = "login" | "user" | "map-tags-update" | "register";

export type TAppState = {
  isInitialized: boolean;
  messages: TAppMessage[];
  isFetching: boolean;
  modalType: AppModalTypes | null;
  currentTheme: ThemeKey | null;
};

const slice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "idle",
    modalType: null,
    messages: [],
    isFetching: false,
    currentTheme: null,
  } as TAppState,
  reducers: {
    setIsInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },
    setAppMessage(state, action: PayloadAction<{ text: string; severity: "error" | "success" }>) {
      const newMessage: TAppMessage = {
        id: String(Math.random()),
        severity: action.payload.severity,
        text: action.payload.text,
      };
      state.messages.push(newMessage);
    },
    setAppModalType(state, action: PayloadAction<TAppState["modalType"]>) {
      state.modalType = action.payload;
    },
    setAppLastMessage(state) {
      state.messages.splice(-1);
    },
    hideAppMessage(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter((el) => el.id !== action.payload);
    },
    setIsFetching(state, action: PayloadAction<boolean>) {
      state.isFetching = action.payload;
    },
    setCurrentTheme(state, action: PayloadAction<ThemeKey>) {
      state.currentTheme = action.payload;
    },
  },
});

export const selectAppModalType = (state: RootState) => state.app.modalType;
export const selectAppTheme = (state: RootState) => state.app.currentTheme;

export const appReducer = slice.reducer;
export const {
  setIsInitialized,
  setAppMessage,
  setAppLastMessage,
  hideAppMessage,
  setIsFetching,
  setAppModalType,
  setCurrentTheme,
} = slice.actions;
