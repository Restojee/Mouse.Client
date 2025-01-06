import { localStorageKeys } from "@/common/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { useCallback, useMemo, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  addChatMessageThunk,
  deleteChatMessageThunk,
  fetchChatMessagesThunk,
  selectChatMessages,
  selectIsChatMessageInitialized,
} from "@/modules/chat/slice";
import { Comment } from "@/api/codegen/genMouseMapsApi";

export const useChat = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectChatMessages);
  const isChatMessageInitialized = useAppSelector(selectIsChatMessageInitialized);
  const { getValue } = useLocalStorage<number>(localStorageKeys.CHAT_MESSAGES_COUNT);

  const [messageText, setMessageText] = useState("");
  const [isSendLoading, setIsSendLoading] = useState(false);

  const onMessageAdd = useCallback(async (): Promise<void> => {
    setIsSendLoading(true);
    const text = String(messageText).trim();

    if (messageText.length && !isSendLoading) {
      const res = await dispatch(addChatMessageThunk({ text }));
      if (res.payload) {
        setMessageText("");
      }
    }
    setIsSendLoading(false);
  }, [dispatch, isSendLoading, messageText]);

  const onMessageDelete = useCallback(async (message: Comment): Promise<void> => {
    if (!message.id) {
      return;
    }
    await dispatch(deleteChatMessageThunk({ messageId: message.id }));
  }, []);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    setMessageText(text);
  }, []);

  const onInputKeyUp = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
      if (e.ctrlKey || e.shiftKey) {
        return;
      }

      if (e.key === "Enter" && !isSendLoading) {
        e.preventDefault();
        await onMessageAdd();
      }
    },
    [onMessageAdd, isSendLoading],
  );

  const isHasNewMessage = useMemo(() => {
    const messagesLength = Number(getValue());
    return messagesLength && messages?.length !== messagesLength;
  }, [getValue, messages?.length]);

  const fetchChatMessages = useCallback(() => {
    dispatch(fetchChatMessagesThunk());
  }, [dispatch]);

  return {
    messageText,
    messages,
    onMessageAdd,
    onInputChange,
    onInputKeyUp,
    isChatMessageInitialized,
    isSendLoading,
    isHasNewMessage,
    onMessageDelete,
    fetchChatMessages,
  };
};
