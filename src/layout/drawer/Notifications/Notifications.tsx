import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import notifStyles from "@/layout/drawer/Notifications/Notifications.module.scss";
import drawerStyles from "@/layout/drawer/Drawer.module.scss";
import { Display } from "@/ui/Display";
import { MessageSkeleton } from "@/ui/Skeleton";
import { useNotifications } from "@/modules/notifications";
import { ApiNotification, NotificationPriority } from "@/modules/notifications/types";
import { NotificationItem } from "@/layout/drawer/Notifications/NotificationItem";
import { EmptyNotifications } from "@/layout/drawer/Notifications/EmptyNotifications";
import { MessageList } from "@/ui/MessageList/MessageList";
import { DragSlider } from "@/ui/DragSlider/DragSlider";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectNotificationItemsByPriority, selectNotificationsLoadingByPriority } from "@/modules/notifications/slice";

const TABS: { label: string; priority: NotificationPriority }[] = [
  { label: "Важное", priority: NotificationPriority.Important },
  { label: "Общее", priority: NotificationPriority.General },
  { label: "Прочее", priority: NotificationPriority.Other },
];

export const Notifications = () => {
  const { activePriority, changeTab, markRead, refreshUnreadCount } = useNotifications();

  const itemsByPriority = useAppSelector(selectNotificationItemsByPriority);
  const loadingByPriority = useAppSelector(selectNotificationsLoadingByPriority);

  const activeTabIndex = TABS.findIndex((t) => t.priority === activePriority);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container || activeTabIndex === -1) return;
    const el = container.children[activeTabIndex + 1] as HTMLElement | undefined;
    if (!el) return;
    setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  }, [activeTabIndex]);

  useEffect(() => {
    TABS.forEach(({ priority }) => changeTab(priority));
    refreshUnreadCount();
  }, []);

  useEffect(() => {
    if (activePriority === NotificationPriority.Important) {
      const unreadIds = itemsByPriority[activePriority]
        .filter((n: ApiNotification) => !n.isRead)
        .map((n: ApiNotification) => n.id);
      markRead(unreadIds);
    }
  }, [activePriority, itemsByPriority]);

  const onIndexChange = (index: number) => {
    changeTab(TABS[index].priority);
  };

  return (
    <div className={notifStyles.container}>
      <div className={drawerStyles.drawerHeader}>Уведомления</div>

      <div
        className={notifStyles.tabsRow}
        ref={tabsContainerRef}
      >
        <div
          className={notifStyles.tabSlideIndicator}
          style={indicatorStyle}
        />
        {TABS.map(({ label, priority }, index) => {
          const tabClassName = clsx(notifStyles.tab, activeTabIndex === index && notifStyles.tabActive);
          return (
            <div
              key={index}
              className={tabClassName}
              onClick={() => changeTab(priority)}
            >
              {label}
            </div>
          );
        })}
      </div>

      <DragSlider
        activeIndex={activeTabIndex}
        onIndexChange={onIndexChange}
      >
        {TABS.map(({ priority }) => {
          const items = itemsByPriority[priority];
          const isLoading = loadingByPriority[priority];
          return (
            <div
              key={priority}
              className={notifStyles.tabPanel}
            >
              <Display condition={isLoading && items.length === 0}>
                <MessageSkeleton count={5} />
              </Display>
              <Display condition={!isLoading && items.length === 0}>
                <EmptyNotifications />
              </Display>
              {items.length > 0 && (
                <MessageList>
                  {items.map((notification: ApiNotification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </MessageList>
              )}
            </div>
          );
        })}
      </DragSlider>
    </div>
  );
};
