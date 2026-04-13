import React, { useCallback, useEffect, useMemo } from "react";
import { Tag } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { selectIsAuth } from "@/modules/auth/slice";
import { selectFilter } from "@/modules/map/containers/map-list/slice";
import { useTag } from "@/modules/tag/hooks/useTag";
import { getTagsThunk } from "@/modules/tag/slice";
import { TagNavItem } from "./TagNavItem";

type UseTagsNavigationProps = {
  isOpen: boolean;
};

export const useTagsNavigation = ({ isOpen }: UseTagsNavigationProps) => {
  const dispatch = useAppDispatch();
  const { modalType, onOpenTagModal, onCloseModal, tagsList } = useTag();
  const { updateFilter } = useFilterQueryParams();
  const isAuth = useAppSelector(selectIsAuth);
  const filter = useAppSelector(selectFilter);

  useEffect(() => {
    dispatch(getTagsThunk());
  }, [dispatch]);

  const onTagClickHandler = useCallback(
    async (id?: Tag["id"]) => {
      if (id == null) return;
      await updateFilter({ page: 1 });
      if (filter.tagIds?.includes(id)) {
        await updateFilter({ tagIds: filter.tagIds.filter((el) => id !== el) });
      } else if (filter.tagIds) {
        await updateFilter({ tagIds: [...filter.tagIds, id] });
      } else {
        await updateFilter({ tagIds: [id] });
      }
    },
    [updateFilter, filter.tagIds],
  );

  const modalToggleHandler = useCallback(() => {
    onOpenTagModal(modalType === "tag-create" ? null : "tag-create");
  }, [modalType, onOpenTagModal]);

  const renderedTags = useMemo(
    () =>
      tagsList?.map((el) => (
        <TagNavItem
          key={el.id}
          tag={el}
          isChecked={Boolean(filter.tagIds?.includes(el.id))}
          isAuth={isAuth}
          isOpen={isOpen}
          onSelect={onTagClickHandler}
        />
      )),
    [tagsList, filter.tagIds, isAuth, isOpen, onTagClickHandler],
  );

  const hasTags = tagsList.length > 0;
  const isCreatePopupVisible = modalType === "tag-create" && isAuth;
  const showCreatePopup = isAuth && isOpen;

  return {
    isAuth,
    hasTags,
    isCreatePopupVisible,
    showCreatePopup,
    renderedTags,
    onCloseModal,
    modalToggleHandler,
  };
};
