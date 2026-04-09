import api from "@/api/coreMapsApi";
import { AxiosResponse } from "axios";
import { NotificationCollectParams, PagedNotificationsResult } from "@/modules/notifications/types";

export const notificationsApi = {
  collect: async (params: NotificationCollectParams) => {
    const res = await api.get<NotificationCollectParams, AxiosResponse<PagedNotificationsResult>>(
      "/notifications/collect",
      { params },
    );
    return res.data;
  },

  getUnreadCount: async () => {
    const res = await api.get<void, AxiosResponse<number>>("/notifications/unread-count");
    return res.data;
  },

  markRead: async (ids: number[]) => {
    await api.put<{ ids: number[] }, AxiosResponse<string>>("/notifications/mark-read", { ids });
  },
};
