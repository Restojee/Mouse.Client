import { notificationsApi } from "@/api/notificationsApi";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiNotification, NotificationPriority, PagedNotificationsResult } from "../types";

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const collectNotificationsThunk = createAsyncThunk(
  "notifications/collect",
  async (priority: NotificationPriority, thunkAPI) => {
    try {
      return await notificationsApi.collect({ priority, page: 1, size: 50 });
    } catch {
      return thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchUnreadCountThunk = createAsyncThunk("notifications/unreadCount", async (_, thunkAPI) => {
  try {
    return await notificationsApi.getUnreadCount();
  } catch {
    return thunkAPI.rejectWithValue(0);
  }
});

export const markNotificationsReadThunk = createAsyncThunk(
  "notifications/markRead",
  async (ids: number[], thunkAPI) => {
    try {
      await notificationsApi.markRead(ids);
      return ids;
    } catch {
      return thunkAPI.rejectWithValue([]);
    }
  },
);

// ─── State ───────────────────────────────────────────────────────────────────

type NotificationsState = {
  items: ApiNotification[];
  total: number;
  isLoading: boolean;
  unreadCount: number;
  activePriority: NotificationPriority;
};

const initialState: NotificationsState = {
  items: [],
  total: 0,
  isLoading: false,
  unreadCount: 0,
  activePriority: NotificationPriority.Important,
};

// ─── Slice ───────────────────────────────────────────────────────────────────

const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setActivePriority(state, action: PayloadAction<NotificationPriority>) {
      state.activePriority = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(collectNotificationsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(collectNotificationsThunk.fulfilled, (state, action: PayloadAction<PagedNotificationsResult>) => {
        state.items = action.payload.records;
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(collectNotificationsThunk.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUnreadCountThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.unreadCount = action.payload;
      })
      .addCase(markNotificationsReadThunk.fulfilled, (state, action: PayloadAction<number[]>) => {
        const readIds = new Set(action.payload);
        state.items = state.items.map((n) => (readIds.has(n.id) ? { ...n, isRead: true } : n));
        // Пересчитываем счётчик локально
        state.unreadCount = Math.max(0, state.unreadCount - action.payload.length);
      });
  },
});

// ─── Selectors ───────────────────────────────────────────────────────────────

export const selectNotificationItems = (state: RootState) => state.notifications.items;
export const selectNotificationsTotal = (state: RootState) => state.notifications.total;
export const selectNotificationsLoading = (state: RootState) => state.notifications.isLoading;
export const selectUnreadCount = (state: RootState) => state.notifications.unreadCount;
export const selectActivePriority = (state: RootState) => state.notifications.activePriority;

export const { setActivePriority } = slice.actions;
export const notificationsReducer = slice.reducer;
