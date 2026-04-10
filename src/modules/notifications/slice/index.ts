import { notificationsApi } from "@/api/notificationsApi";
import { RootState } from "@/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiNotification, NotificationPriority, PagedNotificationsResult } from "../types";

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const collectNotificationsThunk = createAsyncThunk(
  "notifications/collect",
  async (priority: NotificationPriority, thunkAPI) => {
    try {
      const result = await notificationsApi.collect({ priority, page: 1, size: 50 });
      return { priority, result };
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
  itemsByPriority: Record<NotificationPriority, ApiNotification[]>;
  loadingByPriority: Record<NotificationPriority, boolean>;
  total: number;
  unreadCount: number;
  activePriority: NotificationPriority;
};

const emptyByPriority = (): Record<NotificationPriority, ApiNotification[]> => ({
  [NotificationPriority.Important]: [],
  [NotificationPriority.General]: [],
  [NotificationPriority.Other]: [],
});

const initialState: NotificationsState = {
  itemsByPriority: emptyByPriority(),
  loadingByPriority: {
    [NotificationPriority.Important]: false,
    [NotificationPriority.General]: false,
    [NotificationPriority.Other]: false,
  },
  total: 0,
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
      .addCase(collectNotificationsThunk.pending, (state, action) => {
        state.loadingByPriority[action.meta.arg] = true;
      })
      .addCase(
        collectNotificationsThunk.fulfilled,
        (state, action: PayloadAction<{ priority: NotificationPriority; result: PagedNotificationsResult }>) => {
          const { priority, result } = action.payload;
          state.itemsByPriority[priority] = result.records;
          state.total = result.total;
          state.loadingByPriority[priority] = false;
        },
      )
      .addCase(collectNotificationsThunk.rejected, (state, action) => {
        state.loadingByPriority[action.meta.arg] = false;
      })
      .addCase(fetchUnreadCountThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.unreadCount = action.payload;
      })
      .addCase(markNotificationsReadThunk.fulfilled, (state, action: PayloadAction<number[]>) => {
        const readIds = new Set(action.payload);
        state.itemsByPriority[state.activePriority] = state.itemsByPriority[state.activePriority].map((n) =>
          readIds.has(n.id) ? { ...n, isRead: true } : n,
        );
        state.unreadCount = Math.max(0, state.unreadCount - action.payload.length);
      });
  },
});

// ─── Selectors ───────────────────────────────────────────────────────────────

export const selectNotificationItemsByPriority = (state: RootState) => state.notifications.itemsByPriority;
export const selectNotificationsLoadingByPriority = (state: RootState) => state.notifications.loadingByPriority;
// Обратная совместимость
export const selectNotificationItems = (state: RootState) =>
  state.notifications.itemsByPriority[state.notifications.activePriority];
export const selectNotificationsLoading = (state: RootState) =>
  state.notifications.loadingByPriority[state.notifications.activePriority];
export const selectNotificationsTotal = (state: RootState) => state.notifications.total;
export const selectUnreadCount = (state: RootState) => state.notifications.unreadCount;
export const selectActivePriority = (state: RootState) => state.notifications.activePriority;

export const { setActivePriority } = slice.actions;
export const notificationsReducer = slice.reducer;
