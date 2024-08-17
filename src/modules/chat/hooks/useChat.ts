import { localStorageKeys } from "@/common/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { useCallback, useMemo, useState } from "react";
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    addChatMessageThunk,
    getChatMessagesThunk,
    selectChatMessages,
    selectIsChatMessageCreateFetching,
    selectIsChatMessageInitialized,
} from '@/modules/chat/slice';

export const useChat = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectChatMessages);
    const isChatMessageInitialized = useAppSelector(selectIsChatMessageInitialized);
    const isChatMessageCreateFetching = useAppSelector(selectIsChatMessageCreateFetching);
    const {getValue} = useLocalStorage<number>(localStorageKeys.CHAT_MESSAGES_COUNT);

    const [messageText, setMessageText] = useState('');

    const onMessageAdd = useCallback(async (): Promise<void> => {
        const text = String(messageText).trim();

        if (messageText.length) {
            const res = await dispatch(addChatMessageThunk({ text }));
            if (res.payload) {
                setMessageText('');
            }
        }
    }, [messageText]);

    const onInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.currentTarget.value;
        setMessageText(text);
    }, []);

    const onInputKeyUp = useCallback(async (e: React.KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
        if (e.ctrlKey || e.shiftKey) {
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            await onMessageAdd();
        }
    }, [onMessageAdd]);

    const isHasNewMessage = useMemo(() => {
        const messagesLength = Number(getValue());
        return messagesLength && messages?.length !== messagesLength;
    }, [getValue, messages?.length])

    const fetchChatMessages = useCallback(() => {
        dispatch(getChatMessagesThunk());
    }, [dispatch])

    return {
        messageText,
        messages,
        onMessageAdd,
        onInputChange,
        onInputKeyUp,
        isChatMessageInitialized,
        isChatMessageCreateFetching,
        isHasNewMessage,
        fetchChatMessages,
    };
};

