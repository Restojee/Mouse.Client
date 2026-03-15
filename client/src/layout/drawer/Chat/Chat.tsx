import { localStorageKeys } from "@/common/constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUser } from "@/modules/user/hooks/useUser";
import React, { useCallback, useEffect, useRef } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectCurrentUser, selectIsAuth } from "@/modules/auth/slice";
import { useChat } from "@/modules/chat/hooks/useChat";
import { Message } from "@/ui/Message";
import { MessageSendFormContainer } from "@/ui/Message/MessagesSendForm";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { StyledBox } from "@/ui/Box";
import { User } from "@/api/codegen/genMouseMapsApi";
import { getStarsByUserId } from "@/modules/user/utils/getStarsByUserId";

export const Chat = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectCurrentUser);

  const { setValue } = useLocalStorage(localStorageKeys.CHAT_MESSAGES_COUNT);
  const { messages, messageText, onMessageAdd, isSendLoading, onInputKeyUp, onInputChange, onMessageDelete } =
    useChat();
  const { theme } = useAppTheme();
  const { onOpenUserModal, users } = useUser();
  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  const getUserStarsCount = useCallback(
    (id: User["id"]) => {
      return getStarsByUserId(id, users);
    },
    [users],
  );

  const scrollToBottomHandler = useCallback((isNotSmooth?: boolean) => {
    const ref = scrollToBottomRef.current;
    const timeout = isNotSmooth ? 0 : 200;

    if (ref) {
      setTimeout(() => {
        ref.scrollTo({
          top: ref.scrollHeight,
          behavior: isNotSmooth ? undefined : "smooth",
        });
      }, timeout);
    }
  }, []);

  const onFocusHandler = useCallback(async () => {
    scrollToBottomHandler();
  }, [scrollToBottomHandler]);

  const onUsernameClickHandler = useCallback(
    (id: number) => {
      onOpenUserModal(id);
    },
    [onOpenUserModal],
  );

  useEffect(() => {
    if (messages?.length) {
      setValue(messages?.length);
    }

    scrollToBottomHandler(true);
  }, [messages?.length]);

  return (
    <>
      <StyledBox
        direction="column"
        padding="0 0 0 20px"
        overflow={"hidden"}
        grow={1}
      >
        <StyledDrawerHeader>Чат</StyledDrawerHeader>
        <StyledBox
          ref={scrollToBottomRef}
          grow={1}
          direction={"column"}
          gap={10}
          padding={"0 20px 20px 0"}
          overflow={"auto"}
          margin={"auto 0 0 0"}
        >
          {messages?.map((el) => (
            <Message
              key={el.id}
              comment={el}
              padding={"10px"}
              getStarsCount={getUserStarsCount}
              onDelete={onMessageDelete}
              isDeleteView={currentUser?.id === el.user?.id}
              onUsernameClick={onUsernameClickHandler}
            />
          ))}
        </StyledBox>
      </StyledBox>
      <StyledBox
        bgColor={theme.colors.secondary}
        padding={"0 10px 0 10px"}
      >
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
