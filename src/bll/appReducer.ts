import { ThemeKey } from "@/layout/theme/types";
import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAppMessage = {
  id: string;
  severity: "error" | "success";
  text: string;
};

export type TAppState = {
  isInitialized: boolean;
  messages: TAppMessage[];
  isFetching: boolean;
  currentTheme: ThemeKey | null;
};

const slice = createSlice({
  name: "app",
  initialState: {
    isInitialized: false,
    status: "idle",
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

export const selectAppTheme = (state: RootState) => state.app.currentTheme;

export const appReducer = slice.reducer;
export const { setIsInitialized, setAppMessage, setAppLastMessage, hideAppMessage, setIsFetching, setCurrentTheme } =
  slice.actions;
