import { LOCAL_STORAGE_KEYS } from "@/common/constants";
import { useHasNewItems } from "@/hooks/useHasNewItems";
import { notificationList } from "@/modules/notifications";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useCallback } from "react";

export const useNotifications = () => {
  const isHasNewNotifications = useHasNewItems(LOCAL_STORAGE_KEYS.NOTIFICATIONS_COUNT, notificationList?.length);
  const { setValue } = useLocalStorage(LOCAL_STORAGE_KEYS.NOTIFICATIONS_COUNT);

  const updateNotificationsCount = useCallback(() => {
    if (notificationList?.length) {
      setValue(notificationList?.length);
    }
  }, [setValue]);

  return {
    notificationList,
    isHasNewNotifications,
    updateNotificationsCount,
  };
};
