import React from "react";
import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { ApiNotification } from "@/modules/notifications/types";
import { MessageCard } from "@/ui/MessageCard/MessageCard";
import { NotificationBody } from "@/layout/drawer/Notifications/NotificationBody";
import { useUser } from "@/modules/user/hooks/useUser";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks";

type NotificationItemProps = {
  notification: ApiNotification;
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { onOpenUserModal } = useUser();
  const { openMap } = useMapView();

  const actor = notification.actor;

  return (
    <MessageCard
      avatar={actor?.avatar ? getAvatarImageLink(actor.avatar) : undefined}
      username={actor?.userName ?? undefined}
      date={formatDateTime(notification.createdUtcDate)}
      padding="10px"
      onAuthorClick={actor ? () => onOpenUserModal(actor.id) : undefined}
    >
      <NotificationBody
        notification={notification}
        onOpenMap={openMap}
        onOpenUser={onOpenUserModal}
      />
    </MessageCard>
  );
};
