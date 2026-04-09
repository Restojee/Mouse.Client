import React from "react";
import { ApiNotification } from "@/modules/notifications/types";
import { renderNotificationBody, NotificationRenderContext } from "@/modules/notifications/utils/notificationText";

type NotificationBodyProps = {
  notification: ApiNotification;
  onOpenMap: (id: number) => void;
  onOpenUser: (id: number) => void;
  onOpenTip?: (id: number) => void;
};

/**
 * Рендерит тело уведомления с кликабельными сущностями.
 * Делегирует renderNotificationBody из утилиты уведомлений.
 */
export const NotificationBody: React.FC<NotificationBodyProps> = (props) => {
  const ctx: NotificationRenderContext = {
    notification: props.notification,
    onOpenMap: props.onOpenMap,
    onOpenUser: props.onOpenUser,
    onOpenTip: props.onOpenTip,
  };
  return <>{renderNotificationBody(ctx)}</>;
};
