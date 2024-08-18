import { localStorageKeys } from "@/common/constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useUser } from '@/modules/user/hooks/useUser';
import React, { useCallback, useEffect, useRef } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppTheme } from '@/hooks/useAppTheme';
import { selectIsAuth } from '@/modules/auth/slice';
import { useChat } from '@/modules/chat/hooks/useChat';
import { Message } from '@/ui/Message';
import { MessageSendFormContainer } from '@/ui/Message/MessagesSendForm';
import { StyledDrawerHeader } from '@/layout/drawer/styled';
import { StyledBox } from '@/ui/Box';

export const Chat = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const {setValue} = useLocalStorage(localStorageKeys.CHAT_MESSAGES_COUNT);
    const {
        messages,
        messageText,
        onMessageAdd,
        isChatMessageCreateFetching,
        onInputKeyUp,
        onInputChange,
    } = useChat();

    const { theme } = useAppTheme();

    const { onOpenUserModal } = useUser();

    const scrollToBottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottomHandler = useCallback((isNotSmooth?: boolean) => {
        const ref = scrollToBottomRef.current;
        const timeout = isNotSmooth ? 0 : 200;

        if (ref) {
            setTimeout(() => {

                ref.scrollTo({
                    top: ref.scrollHeight,
                    behavior: isNotSmooth ? undefined : 'smooth',
                });
            }, timeout);
        }
    }, []);

    const onFocusHandler = useCallback(async () => {
        scrollToBottomHandler();
    }, [scrollToBottomHandler]);

    const onUsernameClickHandler = useCallback((id: number) => {
        onOpenUserModal(id);
    }, [onOpenUserModal]);

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
                overflow={'hidden'}
                grow={1}
            >
                <StyledDrawerHeader>
                    Чат
                </StyledDrawerHeader>
                <StyledBox
                    ref={scrollToBottomRef}
                    grow={1}
                    direction={'column'}
                    gap={10}
                    padding={'0 20px 20px 0'}
                    overflow={'auto'}
                    margin={'auto 0 0 0'}
                >
                    {messages?.map((el) => (
                        <Message
                            key={el.id}
                            comment={el}
                            padding={'10px'}
                            onUsernameClick={onUsernameClickHandler}
                        />
                    ))}
                </StyledBox>

            </StyledBox>
            <StyledBox
                bgColor={theme.colors.secondary}
                padding={'0 10px 0 10px'}
            >
                <MessageSendFormContainer
                    onChange={onInputChange}
                    value={messageText}
                    onFocus={onFocusHandler}
                    onSendClick={onMessageAdd}
                    onKeyUp={onInputKeyUp}
                    isFetching={isChatMessageCreateFetching}
                    disabled={!isAuth}
                />
            </StyledBox>
        </>
    );
};

