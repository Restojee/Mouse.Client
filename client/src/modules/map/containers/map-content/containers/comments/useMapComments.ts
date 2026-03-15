import { Comment, Map } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import {
  addMapCommentsThunk,
  deleteMapCommentsThunk,
  fetchMapCommentsThunk,
  selectIsCommentCreateFetching,
  selectIsCommentsInitialized,
  selectMapComments,
} from "./slice";
import { selectCurrentUser } from "@/modules/auth/slice";

export const useMapComments = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const comments = useAppSelector(selectMapComments, shallowEqual);
  const isCommentsInitialized = useAppSelector(selectIsCommentsInitialized);
  const isCommentCreateFetching = useAppSelector(selectIsCommentCreateFetching);
  const user = useAppSelector(selectCurrentUser);

  const [commentText, setCommentText] = useState("");

  const { levelId } = router.query;

  const onCommentDelete = useCallback(
    (comment: Comment) => {
      if (!comment.id || user?.id !== comment.user?.id || !levelId) {
        return;
      }
      dispatch(deleteMapCommentsThunk({ commentId: comment.id, levelId: levelId as unknown as Comment["id"] }));
    },
    [user, levelId],
  );

  const onCommentAdd = useCallback(
    async (levelId: Map["id"]): Promise<void> => {
      const messageText = String(commentText).trim();

      if (messageText.length) {
        const res = await dispatch(addMapCommentsThunk({ levelId, text: commentText }));
        if (res.payload) {
          setCommentText("");
        }
      }
    },
    [commentText],
  );

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    setCommentText(text);
  }, []);

  const onInputKeyUp = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>, levelId: Map["id"]): Promise<void> => {
      if (e.ctrlKey || e.shiftKey) {
        return;
      }

      if (e.key === "Enter") {
        await onCommentAdd(levelId);
      }
    },
    [onCommentAdd],
  );

  useEffect(() => {
    if (levelId) {
      const id = setInterval(() => {
        dispatch(fetchMapCommentsThunk({ levelId: Number(levelId) }));
      }, 5000);
      return () => {
        clearInterval(id);
      };
    }
  }, [levelId]);

  return {
    comments,
    commentText,
    onCommentDelete,
    onCommentAdd,
    onInputChange,
    onInputKeyUp,
    isCommentsInitialized,
    isCommentCreateFetching,
  };
};
