import { StyledBox } from "@/ui/Box";
import React, { useEffect } from "react";
import { StyledTab } from "@/layout/drawer/Notifications/styled";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { Display } from "@/ui/Display";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { useNotifications } from "@/modules/notifications";
import { ApiNotification, NotificationPriority } from "@/modules/notifications/types";
import { NotificationItem } from "@/layout/drawer/Notifications/NotificationItem";
import { EmptyNotifications } from "@/layout/drawer/Notifications/EmptyNotifications";
import { MessageList } from "@/ui/MessageList/MessageList";

const TABS: { label: string; priority: NotificationPriority }[] = [
  { label: "Важное", priority: NotificationPriority.Important },
  { label: "Общее", priority: NotificationPriority.General },
  { label: "Прочее", priority: NotificationPriority.Other },
];

export const Notifications = () => {
  const { items, isLoading, activePriority, changeTab, markRead, refreshUnreadCount } = useNotifications();

  const activeTabIndex = TABS.findIndex((t) => t.priority === activePriority);

  useEffect(() => {
    changeTab(activePriority);
    refreshUnreadCount();
  }, []);

  useEffect(() => {
    if (activePriority === NotificationPriority.Important && items.length > 0) {
      const unreadIds = items.filter((n: ApiNotification) => !n.isRead).map((n: ApiNotification) => n.id);
      markRead(unreadIds);
    }
  }, [activePriority, items]);

  return (
    <StyledBox
      height="100%"
      direction="column"
      padding="0 20px"
    >
      <StyledDrawerHeader>Уведомления</StyledDrawerHeader>

      <StyledBox
        gap="20px"
        margin="0 0 20px 0"
      >
        {TABS.map(({ label, priority }, index) => (
          <StyledTab
            key={index}
            onClick={() => changeTab(priority)}
            isActive={activeTabIndex === index}
          >
            {label}
          </StyledTab>
        ))}
      </StyledBox>

      <BoxLoader isLoading={isLoading} />

      <Display condition={!isLoading && items.length === 0}>
        <EmptyNotifications />
      </Display>

      {!isLoading && items.length > 0 && (
        <MessageList>
          {items.map((notification: ApiNotification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </MessageList>
      )}
    </StyledBox>
  );
};
