import { useUser } from "@/modules/user/hooks/useUser";
import React, { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectCurrentUser, selectIsAuth } from "@/modules/auth/slice";
import { useChat } from "@/modules/chat/hooks/useChat";
import { Message } from "@/ui/Message";
import { MessageSendFormContainer } from "@/ui/Message/MessagesSendForm";
import { MessageList } from "@/ui/MessageList/MessageList";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { StyledBox } from "@/ui/Box";
import { User } from "@/api/codegen/genMouseMapsApi";
import { getStarsByUserId } from "@/modules/user/utils/getStarsByUserId";

export const Chat = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectCurrentUser);

  const {
    updateMessagesCount,
    messages,
    messageText,
    onMessageAdd,
    isSendLoading,
    onInputKeyUp,
    onInputChange,
    onMessageDelete,
  } = useChat();
  const { theme } = useAppTheme();
  const { onOpenUserModal, users } = useUser();
  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  const getUserStarsCount = useCallback((id: User["id"]) => getStarsByUserId(id, users), [users]);

  const scrollToBottomHandler = useCallback((isNotSmooth?: boolean) => {
    const ref = scrollToBottomRef.current;
    if (ref) {
      setTimeout(
        () => ref.scrollTo({ top: ref.scrollHeight, behavior: isNotSmooth ? undefined : "smooth" }),
        isNotSmooth ? 0 : 200,
      );
    }
  }, []);

  const onFocusHandler = useCallback(() => scrollToBottomHandler(), [scrollToBottomHandler]);

  const onUsernameClickHandler = useCallback((id: number) => onOpenUserModal(id), [onOpenUserModal]);

  const onMentionClickHandler = useCallback(
    (username: string) => {
      const user = users?.find((u) => u.username === username);
      if (user?.id) onOpenUserModal(user.id);
    },
    [users, onOpenUserModal],
  );

  useEffect(() => {
    updateMessagesCount();
    scrollToBottomHandler(true);
  }, [messages?.length]);

  return (
    <>
      <StyledBox
        direction="column"
        overflow={"hidden"}
        grow={1}
      >
        <StyledDrawerHeader>Чат</StyledDrawerHeader>
        <MessageList scrollRef={scrollToBottomRef}>
          {messages?.map((el) => (
            <Message
              key={el.id}
              comment={el}
              padding={"10px"}
              getStarsCount={getUserStarsCount}
              onDelete={onMessageDelete}
              isDeleteView={currentUser?.id === el.user?.id}
              onUsernameClick={onUsernameClickHandler}
              onMentionClick={onMentionClickHandler}
              validUsernames={users?.map((u) => u.username ?? "")}
            />
          ))}
        </MessageList>
      </StyledBox>

      <StyledBox bgColor={theme.colors.secondary}>
        <MessageSendFormContainer
          onChange={onInputChange}
          value={messageText}
          onFocus={onFocusHandler}
          onSendClick={onMessageAdd}
          onKeyUp={onInputKeyUp}
          isFetching={isSendLoading}
          disabled={!isAuth}
        />
      </StyledBox>
    </>
  );
};
