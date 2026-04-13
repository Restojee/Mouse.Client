import { Comment, Map } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { shallowEqual } from "react-redux";
import {
  deleteCommentGuardedThunk,
  fetchMapCommentsThunk,
  selectCommentDraft,
  selectIsCommentCreateFetching,
  selectIsCommentsInitialized,
  selectMapComments,
  setCommentDraft,
  submitCommentThunk,
} from "./slice";

export const useMapComments = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const comments = useAppSelector(selectMapComments, shallowEqual);
  const isCommentsInitialized = useAppSelector(selectIsCommentsInitialized);
  const isCommentCreateFetching = useAppSelector(selectIsCommentCreateFetching);
  const commentText = useAppSelector(selectCommentDraft);

  const { levelId } = router.query;

  const onCommentDelete = useCallback(
    (comment: Comment) => {
      dispatch(deleteCommentGuardedThunk({ comment, levelId: levelId as unknown as Map["id"] }));
    },
    [dispatch, levelId],
  );

  const onCommentAdd = useCallback(
    (id: Map["id"]) => {
      dispatch(submitCommentThunk(id));
    },
    [dispatch],
  );

  const onInputChange = useCallback(
    (value: string) => {
      dispatch(setCommentDraft(value));
    },
    [dispatch],
  );

  const onInputKeyUp = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>, id: Map["id"]): Promise<void> => {
      if (e.ctrlKey || e.shiftKey) return;
      if (e.key === "Enter") {
        await dispatch(submitCommentThunk(id));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (levelId) {
      const id = setInterval(() => {
        dispatch(fetchMapCommentsThunk({ levelId: Number(levelId) }));
      }, 5000);
      return () => clearInterval(id);
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
