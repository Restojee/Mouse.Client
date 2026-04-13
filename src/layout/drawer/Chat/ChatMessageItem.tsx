import React, { memo } from "react";
import { Comment, User } from "@/api/codegen/genMouseMapsApi";
import { Message } from "@/ui/Message";

type ChatMessageItemPropsType = {
  message: Comment;
  isOwn: boolean;
  getStarsCount: (id: User["id"]) => number;
  onDelete: (message: Comment) => void;
  onUsernameClick: (id: number) => void;
  onMentionClick: (username: string) => void;
  onLevelClick: (idOrName: string) => void;
  validUsernames: string[];
};

const WRAPPER_STYLE: React.CSSProperties = { paddingBottom: 10 };

export const ChatMessageItem = memo(
  ({
    message,
    isOwn,
    getStarsCount,
    onDelete,
    onUsernameClick,
    onMentionClick,
    onLevelClick,
    validUsernames,
  }: ChatMessageItemPropsType) => (
    <div style={WRAPPER_STYLE}>
      <Message
        comment={message}
        padding={"10px"}
        getStarsCount={getStarsCount}
        onDelete={onDelete}
        isDeleteView={isOwn}
        onUsernameClick={onUsernameClick}
        onMentionClick={onMentionClick}
        onLevelClick={onLevelClick}
        validUsernames={validUsernames}
      />
    </div>
  ),
);

ChatMessageItem.displayName = "ChatMessageItem";
