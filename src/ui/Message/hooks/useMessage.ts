import { useCallback, useMemo, useState } from "react";
import { Comment } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";

type UseMessagePropsType = {
  comment: Comment;
  onDelete?: (comment: Comment) => void;
  onUsernameClick?: (id: number) => void;
  onMentionClick?: (username: string) => void;
  onLevelClick?: (idOrName: string) => void;
  isDeleteView?: boolean;
  getStarsCount?: (id: number) => number;
  validUsernames?: string[];
};

export const useMessage = ({
  comment,
  onDelete,
  onUsernameClick,
  onMentionClick,
  onLevelClick,
  isDeleteView,
  getStarsCount,
  validUsernames,
}: UseMessagePropsType) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  const onDeleteHandler = useCallback(() => {
    if (comment.id && onDelete) onDelete(comment);
  }, [comment, onDelete]);

  const userId = comment.user?.id;

  const onAuthorClick = useMemo(
    () => (onUsernameClick && userId ? () => onUsernameClick(userId) : undefined),
    [onUsernameClick, userId],
  );

  const starsCount = useMemo(() => {
    if (!userId) return 0;
    return getStarsCount?.(userId) ?? 0;
  }, [userId, getStarsCount]);

  const dateTime = useMemo(() => formatDateTime(comment.createdUtcDate), [comment.createdUtcDate]);
  const time = useMemo(() => formatDateTime(comment.createdUtcDate, false, true), [comment.createdUtcDate]);

  const avatar = useMemo(() => getAvatarImageLink(comment.user?.avatar, "thumb"), [comment.user?.avatar]);
  const username = comment.user?.username;
  const text = comment.text ?? "";
  const showDelete = Boolean(isDeleteView && isHovered);

  return {
    avatar,
    username,
    dateTime,
    time,
    starsCount,
    showDelete,
    onAuthorClick,
    onDeleteHandler,
    onMouseEnter,
    onMouseLeave,
    text,
    validUsernames,
    onMentionClick,
    onLevelClick,
  };
};
