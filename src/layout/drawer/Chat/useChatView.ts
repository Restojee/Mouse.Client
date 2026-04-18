import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VirtuosoHandle } from "react-virtuoso";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser, selectIsAuth } from "@/modules/auth/slice";
import { selectIsChatMessageInitialized } from "@/modules/chat/slice";
import { useChat } from "@/modules/chat/hooks/useChat";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { useUser } from "@/modules/user/hooks/useUser";
import { getStarsByUserId } from "@/modules/user/utils/getStarsByUserId";
import { Comment, User } from "@/api/codegen/genMouseMapsApi";

const VIRTUOSO_INITIAL_INDEX = 1_000_000;

export const useChatView = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectCurrentUser);
  const isChatInitialized = useAppSelector(selectIsChatMessageInitialized);
  const { onOpenUserModal, users } = useUser();
  const { openMap } = useMapView();

  const {
    updateMessagesCount,
    messages,
    messageText,
    onMessageAdd,
    isSendLoading,
    onInputChange,
    onMessageDelete,
    isLoadingOlder,
    hasMoreOlder,
    fetchOlderMessages,
  } = useChat();

  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const [firstItemIndex, setFirstItemIndex] = useState(VIRTUOSO_INITIAL_INDEX);
  const prevMessagesLengthRef = useRef(0);
  const wasLoadingOlderRef = useRef(false);

  useEffect(() => {
    const length = messages?.length ?? 0;
    const prev = prevMessagesLengthRef.current;
    const delta = length - prev;

    if (wasLoadingOlderRef.current && delta > 0) {
      setFirstItemIndex((current) => current - delta);
      wasLoadingOlderRef.current = false;
    }

    prevMessagesLengthRef.current = length;
    updateMessagesCount();
  }, [messages?.length, updateMessagesCount]);

  const startReached = useCallback(() => {
    if (!hasMoreOlder || isLoadingOlder) return;
    wasLoadingOlderRef.current = true;
    fetchOlderMessages();
  }, [hasMoreOlder, isLoadingOlder, fetchOlderMessages]);

  const getStarsCount = useCallback((id: User["id"]) => getStarsByUserId(id, users), [users]);

  const onUsernameClick = useCallback((id: number) => onOpenUserModal(id), [onOpenUserModal]);

  const onMentionClick = useCallback(
    (username: string) => {
      const user = users?.find((u) => u.username === username);
      if (user?.id) onOpenUserModal(user.id);
    },
    [users, onOpenUserModal],
  );

  const onLevelClick = useCallback(
    (idOrName: string) => {
      const id = Number(idOrName);
      if (Number.isFinite(id) && id > 0) {
        openMap(id);
      }
    },
    [openMap],
  );

  const validUsernames = useMemo(() => users?.map((u) => u.username ?? "") ?? [], [users]);

  const onSendFormFocus = useCallback(() => {
    const length = messages?.length ?? 0;
    if (!length) return;
    virtuosoRef.current?.scrollToIndex({ index: length - 1, behavior: "smooth", align: "end" });
  }, [messages?.length]);

  const isOwnMessage = useCallback(
    (message: Comment) => Boolean(currentUser?.id && currentUser.id === message.user?.id),
    [currentUser?.id],
  );

  const sendFormStyle = useMemo(() => ({}), []);

  const initialTopMostItemIndex = useMemo(() => {
    const length = messages?.length ?? 0;
    return length > 0 ? length - 1 : 0;
  }, [messages?.length]);

  return {
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
  };
};
