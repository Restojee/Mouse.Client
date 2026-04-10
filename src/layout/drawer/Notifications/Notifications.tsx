import { StyledBox } from "@/ui/Box";
import React, { useEffect, useRef, useState } from "react";
import { StyledTab, StyledTabSlideIndicator, StyledTabsRow } from "@/layout/drawer/Notifications/styled";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { Display } from "@/ui/Display";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
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
    <StyledBox
      height="100%"
      direction="column"
      padding="0 20px"
    >
      <StyledDrawerHeader>Уведомления</StyledDrawerHeader>

      <StyledTabsRow ref={tabsContainerRef}>
        <StyledTabSlideIndicator style={indicatorStyle} />
        {TABS.map(({ label, priority }, index) => (
          <StyledTab
            key={index}
            onClick={() => changeTab(priority)}
            isActive={activeTabIndex === index}
          >
            {label}
          </StyledTab>
        ))}
      </StyledTabsRow>

      <DragSlider
        activeIndex={activeTabIndex}
        onIndexChange={onIndexChange}
      >
        {TABS.map(({ priority }) => {
          const items = itemsByPriority[priority];
          const isLoading = loadingByPriority[priority];
          return (
            <StyledBox
              key={priority}
              direction="column"
              grow={1}
              overflow="hidden"
            >
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
        })}
      </DragSlider>
    </StyledBox>
  );
};
