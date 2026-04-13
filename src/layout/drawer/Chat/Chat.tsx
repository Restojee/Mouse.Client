import React, { useCallback, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { Comment } from "@/api/codegen/genMouseMapsApi";
import { MessageSendFormContainer } from "@/ui/Message/MessagesSendForm";
import drawerStyles from "@/layout/drawer/Drawer.module.scss";
import chatStyles from "@/layout/drawer/Chat/Chat.module.scss";
import { MessageSkeleton } from "@/ui/Skeleton";
import { ChatMessageItem } from "./ChatMessageItem";
import { useChatView } from "./useChatView";

export const Chat = () => {
  const {
    isAuth,
    messages,
    messageText,
    isSendLoading,
    isLoadingOlder,
    isChatInitialized,
    onInputChange,
    onMessageAdd,
    onMessageDelete,
    onSendFormFocus,
    onUsernameClick,
    onMentionClick,
    onLevelClick,
    getStarsCount,
    isOwnMessage,
    validUsernames,
    sendFormStyle,
    firstItemIndex,
    initialTopMostItemIndex,
    startReached,
    virtuosoRef,
  } = useChatView();

  const itemContent = useCallback(
    (_index: number, message: Comment) => (
      <ChatMessageItem
        message={message}
        isOwn={isOwnMessage(message)}
        getStarsCount={getStarsCount}
        onDelete={onMessageDelete}
        onUsernameClick={onUsernameClick}
        onMentionClick={onMentionClick}
        onLevelClick={onLevelClick}
        validUsernames={validUsernames}
      />
    ),
    [isOwnMessage, getStarsCount, onMessageDelete, onUsernameClick, onMentionClick, onLevelClick, validUsernames],
  );

  const VirtuosoHeader = useCallback(() => {
    if (!isLoadingOlder) return null;
    return <MessageSkeleton count={3} />;
  }, [isLoadingOlder]);

  const virtuosoComponents = useMemo(() => ({ Header: VirtuosoHeader }), [VirtuosoHeader]);

  return (
    <>
      <div className={chatStyles.chatBody}>
        <div className={drawerStyles.drawerHeader}>Чат</div>
        {!isChatInitialized ? (
          <MessageSkeleton alternate />
        ) : (
          <Virtuoso
            ref={virtuosoRef}
            data={messages ?? []}
            firstItemIndex={firstItemIndex}
            initialTopMostItemIndex={initialTopMostItemIndex}
            startReached={startReached}
            followOutput="smooth"
            itemContent={itemContent}
            increaseViewportBy={{ top: 400, bottom: 400 }}
            components={virtuosoComponents}
          />
        )}
      </div>

      <div style={sendFormStyle}>
        <MessageSendFormContainer
          onChange={onInputChange}
          value={messageText}
          onFocus={onSendFormFocus}
          onSendClick={onMessageAdd}
          isFetching={isSendLoading}
          disabled={!isAuth}
        />
      </div>
    </>
  );
};
