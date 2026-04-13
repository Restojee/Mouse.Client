import { Map, User } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser, selectIsAuth } from "@/modules/auth/slice";
import { getStarsByUserId } from "@/modules/user/utils/getStarsByUserId";
import { selectUsers } from "@/modules/user/slice";
import { useUser } from "@/modules/user/hooks/useUser";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Message } from "@/ui/Message";
import { submitCommentThunk } from "./slice";
import { useMapComments } from "./useMapComments";

type UseSidebarCommentsProps = {
  levelId: Map["id"];
};

export const useSidebarComments = ({ levelId }: UseSidebarCommentsProps) => {
  const dispatch = useAppDispatch();
  const { onOpenUserModal } = useUser();
  const {
    comments,
    commentText,
    onCommentDelete,
    onInputChange,
    onInputKeyUp,
    isCommentsInitialized,
    isCommentCreateFetching,
  } = useMapComments();

  const users = useAppSelector(selectUsers);
  const isAuth = useAppSelector(selectIsAuth);
  const currentUser = useAppSelector(selectCurrentUser);

  const scrollToBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((isNotSmooth?: boolean) => {
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

  const onFocusHandler = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const onCommentAddHandler = useCallback(() => {
    dispatch(submitCommentThunk(levelId));
  }, [dispatch, levelId]);

  const onUsernameClickHandler = useCallback(
    (id: number) => {
      onOpenUserModal(id);
    },
    [onOpenUserModal],
  );

  const onMentionClickHandler = useCallback(
    (username: string) => {
      const user = users?.find((u) => u.username === username);
      if (user?.id) {
        onOpenUserModal(user.id);
      }
    },
    [onOpenUserModal, users],
  );

  const getUserStarsCount = useCallback((id: User["id"]) => getStarsByUserId(id, users), [users]);

  const validUsernames = useMemo(() => users?.map((u) => u.username ?? ""), [users]);

  const hasComments = Boolean(comments?.length);
  const showEmpty = !hasComments && isCommentsInitialized;

  const renderedComments = useMemo(
    () =>
      comments?.map((mapComment) => (
        <Message
          key={mapComment.id}
          comment={mapComment}
          getStarsCount={getUserStarsCount}
          onDelete={onCommentDelete}
          onUsernameClick={onUsernameClickHandler}
          onMentionClick={onMentionClickHandler}
          isDeleteView={currentUser?.id === mapComment.user?.id}
          validUsernames={validUsernames}
        />
      )),
    [
      comments,
      getUserStarsCount,
      onCommentDelete,
      onUsernameClickHandler,
      onMentionClickHandler,
      currentUser?.id,
      validUsernames,
    ],
  );

  useEffect(() => {
    scrollToBottom(true);
  }, [comments?.length]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return {
    commentText,
    onInputChange,
    isCommentsInitialized,
    isCommentCreateFetching,
    isAuth,
    scrollToBottomRef,
    onFocusHandler,
    onCommentAddHandler,
    hasComments,
    showEmpty,
    renderedComments,
  };
};
