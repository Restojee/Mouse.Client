// Зеркало Mouse.NET.Common.NotificationType
export enum NotificationType {
  // Общие
  UserRegistered = 0,
  CommentAdded = 1,
  TipAdded = 2,
  // Важные (персональные)
  MentionInComment = 3,
  MentionInMessage = 4,
  LevelEdited = 5,
  LevelImageEdited = 6,
  LevelTagsEdited = 7,
  // Другие (агрегируемые)
  LevelCompleted = 8,
  LevelAdded = 9,
  TagAdded = 10,
}

// Зеркало Mouse.NET.Common.NotificationPriority
export enum NotificationPriority {
  General = 0,
  Important = 1,
  Other = 2,
}

export interface NotificationActor {
  id: number;
  userName: string | null;
  avatar: string | null;
}

export interface NotificationCommentDto {
  id: number;
  text: string;
  level: NotificationLevelDto | null;
}

export interface NotificationLevelDto {
  id: number;
  name: string;
}

export interface NotificationTagDto {
  id: number;
  name: string;
}

export interface NotificationTipDto {
  id: number;
  title: string;
}

export interface NotificationMessageDto {
  id: number;
  text: string;
}

export interface ApiNotification {
  id: number;
  type: NotificationType;
  priority: NotificationPriority;
  actor: NotificationActor | null;
  groupKey: string | null;
  isRead: boolean;
  createdUtcDate: string | null;
  comment: NotificationCommentDto | null;
  level: NotificationLevelDto | null;
  tag: NotificationTagDto | null;
  tip: NotificationTipDto | null;
  message: NotificationMessageDto | null;
}

export interface PagedNotificationsResult {
  records: ApiNotification[];
  total: number;
  page: number;
  size: number;
}

export interface NotificationCollectParams {
  priority: NotificationPriority;
  isRead?: boolean;
  page?: number;
  size?: number;
}
