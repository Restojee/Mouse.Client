import { useCallback } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  collectNotificationsThunk,
  fetchUnreadCountThunk,
  markNotificationsReadThunk,
  selectActivePriority,
  selectNotificationItems,
  selectNotificationsLoading,
  selectUnreadCount,
  setActivePriority,
} from "@/modules/notifications/slice";
import { NotificationPriority } from "@/modules/notifications/types";
import { notificationList } from "@/modules/notifications/constants";

export const useNotifications = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectNotificationItems);
  const isLoading = useAppSelector(selectNotificationsLoading);
  const unreadCount = useAppSelector(selectUnreadCount);
  const activePriority = useAppSelector(selectActivePriority);

  const isHasNewNotifications = unreadCount > 0;

  const loadNotifications = useCallback(
    (priority: NotificationPriority) => {
      dispatch(collectNotificationsThunk(priority));
    },
    [dispatch],
  );

  const refreshUnreadCount = useCallback(() => {
    dispatch(fetchUnreadCountThunk());
  }, [dispatch]);

  const markRead = useCallback(
    (ids: number[]) => {
      if (ids.length > 0) {
        dispatch(markNotificationsReadThunk(ids));
      }
    },
    [dispatch],
  );

  const changeTab = useCallback(
    (priority: NotificationPriority) => {
      dispatch(setActivePriority(priority));
      dispatch(collectNotificationsThunk(priority));
    },
    [dispatch],
  );

  // Сохраняем обратную совместимость: статический список объявлений
  const updateNotificationsCount = useCallback(() => {
    dispatch(fetchUnreadCountThunk());
  }, [dispatch]);

  return {
    // API-уведомления
    items,
    isLoading,
    unreadCount,
    activePriority,
    isHasNewNotifications,
    loadNotifications,
    refreshUnreadCount,
    markRead,
    changeTab,
    // Статические объявления (вкладка «Прочее» / старое поведение)
    notificationList,
    updateNotificationsCount,
  };
};
