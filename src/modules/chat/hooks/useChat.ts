import React, { useCallback, useEffect, useState } from 'react';
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
            await onMessageAdd();
        }
    }, [onMessageAdd]);

    useEffect(() => {
        dispatch(getChatMessagesThunk());
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            dispatch(getChatMessagesThunk());
        }, 5000);
        return () => {
            clearInterval(id);
        };
    }, []);

    return {
        messageText,
        messages,
        onMessageAdd,
        onInputChange,
        onInputKeyUp,
        isChatMessageInitialized,
        isChatMessageCreateFetching,
    };
};

