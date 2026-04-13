import React, { useCallback } from "react";
import { Tag } from "@/api/codegen/genMouseMapsApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAdmin } from "@/modules/auth/slice";
import { useTag } from "@/modules/tag/hooks/useTag";

type UseTagItemActionsProps = {
  tag: Tag;
};

export const useTagItemActions = ({ tag }: UseTagItemActionsProps) => {
  const { openTagUpdateModal, openTagDeleteModal } = useTag();
  const isAdmin = useAppSelector(selectIsAdmin);

  const onTagEditHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openTagUpdateModal(tag);
    },
    [openTagUpdateModal, tag],
  );

  const onTagDeleteHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      openTagDeleteModal(tag);
    },
    [openTagDeleteModal, tag],
  );

  return { isAdmin, onTagEditHandler, onTagDeleteHandler };
};
