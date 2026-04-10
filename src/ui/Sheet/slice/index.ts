import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SheetConfig } from "../model/types";

/** Сериализуемая запись в стеке (без ReactNode и callbacks) */
export type SheetStoreEntry = {
  id: string;
  config: SheetConfig;
};

type SheetState = {
  stack: SheetStoreEntry[];
};

const initialState: SheetState = {
  stack: [],
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    pushSheet(state, action: PayloadAction<SheetStoreEntry>) {
      state.stack.push(action.payload);
    },
    removeSheet(state, action: PayloadAction<string>) {
      state.stack = state.stack.filter((e) => e.id !== action.payload);
    },
    clearSheets(state) {
      state.stack = [];
    },
  },
});

export const { pushSheet, removeSheet, clearSheets } = sheetSlice.actions;
export const sheetReducer = sheetSlice.reducer;

export const selectSheetStack = (state: { sheet: SheetState }) => state.sheet.stack;
