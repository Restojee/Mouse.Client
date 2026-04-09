import React, { ReactNode } from "react";
import { ApiNotification, NotificationType } from "@/modules/notifications/types";
import { TextLink } from "@/ui/TextLink/TextLink";

export function t(strings: TemplateStringsArray, ...values: ReactNode[]): ReactNode {
  return strings.flatMap((s, i) => [s, values[i]]).filter(Boolean);
}

export type NotificationRenderContext = {
  notification: ApiNotification;
  onOpenMap: (id: number) => void;
  onOpenUser: (id: number) => void;
  onOpenTip?: (id: number) => void;
};

type Renderer = (ctx: NotificationRenderContext) => ReactNode;

const levelLink = (level: { id: number; name: string } | undefined | null, onOpenMap: (id: number) => void) =>
  level ? <TextLink onClick={() => onOpenMap(level.id)}>«{level.name}»</TextLink> : null;

const tipLink = (tip: { id: number; title: string } | undefined | null) =>
  tip ? <TextLink>«{tip.title}»</TextLink> : null;

const commentText = (comment: { text: string } | undefined | null) => (comment?.text ? `«${comment.text}»` : null);

const tagText = (tag: { name: string } | undefined | null) => (tag?.name ? `«${tag.name}»` : null);

export const NOTIFICATION_BODY_MAP: Record<NotificationType, Renderer> = {
  [NotificationType.UserRegistered]: () => t`теперь один из нас!`,

  [NotificationType.CommentAdded]: ({ notification, onOpenMap }) => {
    const comment = notification.comment;
    return t`Оставил комментарий к карте ${levelLink(comment?.level ?? notification.level, onOpenMap)} — ${commentText(comment)}`;
  },

  [NotificationType.TipAdded]: ({ notification }) => t`Поделился полезной инфой ${tipLink(notification.tip)}`,

  [NotificationType.MentionInComment]: ({ notification }) => {
    return `Упомянул вас: ${commentText(notification.comment)}`;
  },

  [NotificationType.MentionInMessage]: ({ notification }) => {
    const msg = notification.message;
    return msg?.text ? `Упомянул вас в чате «${msg.text}»` : "Упомянул вас в чате";
  },

  [NotificationType.LevelEdited]: ({ notification, onOpenMap }) =>
    t`В вашу карту ${levelLink(notification.level, onOpenMap)} внесли изменения`,

  [NotificationType.LevelImageEdited]: ({ notification, onOpenMap }) =>
    t`Добавлен скриншот к вашей карте ${levelLink(notification.level, onOpenMap)}`,

  [NotificationType.LevelTagsEdited]: ({ notification, onOpenMap }) =>
    t`Изменены теги вашей карты ${levelLink(notification.level, onOpenMap)}`,

  [NotificationType.LevelCompleted]: ({ notification, onOpenMap }) =>
    t`Выполнил карту ${levelLink(notification.level, onOpenMap)}`,

  [NotificationType.LevelAdded]: ({ notification, onOpenMap }) =>
    t`Добавил карту ${levelLink(notification.level, onOpenMap)}`,

  [NotificationType.TagAdded]: ({ notification }) => {
    return t`Добавил новый тег ${tagText(notification.tag)}`;
  },
};

export const renderNotificationBody = (ctx: NotificationRenderContext): ReactNode =>
  NOTIFICATION_BODY_MAP[ctx.notification.type]?.(ctx) ?? "Новое уведомление";
