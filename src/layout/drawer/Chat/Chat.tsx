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
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";

const LOAD_OLDER_THRESHOLD = 80;

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
    isLoadingOlder,
    hasMoreOlder,
    fetchOlderMessages,
  } = useChat();
  const { theme } = useAppTheme();
  const { onOpenUserModal, users } = useUser();

  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const wasLoadingOlderRef = useRef(false);
  const prevScrollHeightRef = useRef(0);
  const isLoadingOlderRef = useRef(isLoadingOlder);
  isLoadingOlderRef.current = isLoadingOlder;

  const getUserStarsCount = useCallback((id: User["id"]) => getStarsByUserId(id, users), [users]);

  const scrollToBottom = useCallback((instant?: boolean) => {
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(
      () => el.scrollTo({ top: el.scrollHeight, behavior: instant ? undefined : "smooth" }),
      instant ? 0 : 200,
    );
  }, []);

  const onFocusHandler = useCallback(() => scrollToBottom(), [scrollToBottom]);

  const onUsernameClickHandler = useCallback((id: number) => onOpenUserModal(id), [onOpenUserModal]);

  const onMentionClickHandler = useCallback(
    (username: string) => {
      const user = users?.find((u) => u.username === username);
      if (user?.id) onOpenUserModal(user.id);
    },
    [users, onOpenUserModal],
  );

  const handleLoadOlder = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isLoadingOlderRef.current || !hasMoreOlder) return;
    prevScrollHeightRef.current = el.scrollHeight;
    wasLoadingOlderRef.current = true;
    isLoadingOlderRef.current = true;
    fetchOlderMessages();
  }, [hasMoreOlder, fetchOlderMessages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
      if (el.scrollTop < LOAD_OLDER_THRESHOLD) {
        handleLoadOlder();
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [handleLoadOlder]);

  useEffect(() => {
    if (wasLoadingOlderRef.current && !isLoadingOlder) {
      const el = scrollRef.current;
      if (el && prevScrollHeightRef.current) {
        el.scrollTop = el.scrollHeight - prevScrollHeightRef.current;
      }
      wasLoadingOlderRef.current = false;
      prevScrollHeightRef.current = 0;
    } else if (isAtBottomRef.current) {
      scrollToBottom(true);
    }
    updateMessagesCount();
  }, [messages?.length, isLoadingOlder]);

  return (
    <>
      <StyledBox
        direction="column"
        overflow={"hidden"}
        grow={1}
      >
        <StyledDrawerHeader>Чат</StyledDrawerHeader>
        <MessageList scrollRef={scrollRef}>
          <BoxLoader isLoading={isLoadingOlder} />
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
