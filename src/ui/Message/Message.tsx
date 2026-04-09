import { Comment } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { CloseIcon } from "@/svg/CloseIcon";
import { IconButton } from "@/ui/Button/IconButton";
import { MessageCard } from "@/ui/MessageCard/MessageCard";
import StarRating from "@/ui/StarRating/StarRating";
import { Property } from "csstype";
import React, { useMemo, useState } from "react";
import { renderRichContent } from "@/ui/TextEditor/renderRichContent";

type PropsType = {
  comment: Comment;
  onDelete?: (comment: Comment) => void;
  onUsernameClick?: (id: number) => void;
  onMentionClick?: (username: string) => void;
  padding?: Property.Padding;
  isDeleteView?: boolean;
  getStarsCount?: (id: number) => number;
  validUsernames?: string[];
};

export const Message = (props: PropsType) => {
  const { comment, onDelete, padding, onUsernameClick, onMentionClick, isDeleteView, getStarsCount, validUsernames } =
    props;
  const [isHovered, setIsHovered] = useState(false);

  const onDeleteHandler = () => {
    if (comment.id && onDelete) onDelete(comment);
  };

  const starsCount = useMemo(() => {
    if (!props.comment.user?.id) return 0;
    return getStarsCount?.(props.comment.user.id) ?? 0;
  }, [props.comment, getStarsCount]);

  const dateTime = useMemo(() => formatDateTime(comment.createdUtcDate), [comment]);
  const time = useMemo(() => formatDateTime(comment.createdUtcDate, false, true), [comment]);

  const content = useMemo(
    () => renderRichContent(comment.text ?? "", { onMentionClick }, validUsernames),
    [comment.text, onMentionClick, validUsernames],
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MessageCard
        avatar={getAvatarImageLink(comment.user?.avatar)}
        username={comment.user?.username}
        date={dateTime}
        dateTitle={time}
        onAuthorClick={onUsernameClick && comment.user?.id ? () => onUsernameClick(comment.user!.id!) : undefined}
        padding={padding}
        headerMiddle={<StarRating count={starsCount} />}
        headerEnd={
          isDeleteView && isHovered
            ? React.createElement(
                IconButton,
                { onClick: onDeleteHandler, isAdmin: true },
                React.createElement(CloseIcon),
              )
            : null
        }
      >
        {content}
      </MessageCard>
    </div>
  );
};
