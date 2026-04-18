import { Comment } from "@/api/codegen/genMouseMapsApi";
import { CloseIcon } from "@/svg/CloseIcon";
import { IconButton } from "@/ui/Button/IconButton";
import { MessageCard } from "@/ui/MessageCard/MessageCard";
import { RenderMarkdown } from "@/ui/RichEditor/RenderMarkdown";
import StarRating from "@/ui/StarRating/StarRating";
import { Property } from "csstype";
import React from "react";
import { useMessage } from "./hooks/useMessage";

type MessagePropsType = {
  comment: Comment;
  onDelete?: (comment: Comment) => void;
  onUsernameClick?: (id: number) => void;
  onMentionClick?: (username: string) => void;
  onLevelClick?: (idOrName: string) => void;
  padding?: Property.Padding;
  isDeleteView?: boolean;
  getStarsCount?: (id: number) => number;
  validUsernames?: string[];
};

export const Message = (props: MessagePropsType) => {
  const {
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
  } = useMessage(props);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <MessageCard
        avatar={avatar}
        username={username}
        date={dateTime}
        dateTitle={time}
        onAuthorClick={onAuthorClick}
        onAvatarClick={onAuthorClick}
        hideHeader={false}
        padding={props.padding}
        headerMiddle={<StarRating count={starsCount} />}
        headerEnd={
          showDelete ? (
            <IconButton
              onClick={onDeleteHandler}
              // isAdmin
            >
              <CloseIcon />
            </IconButton>
          ) : null
        }
      >
        <RenderMarkdown
          content={text}
          validUsernames={validUsernames}
          onMentionClick={onMentionClick}
          onLevelClick={onLevelClick}
        />
      </MessageCard>
    </div>
  );
};
