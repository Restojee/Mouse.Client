import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Tag } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { selectIsAuth } from "@/modules/auth/slice";
import { selectFilter } from "@/modules/map/containers/map-list/slice";
import { useTag } from "@/modules/tag/hooks/useTag";
import { getTagsThunk } from "@/modules/tag/slice";
import { hasChildTags, sortTagsByName } from "@/modules/tag/utils";
import { TagGroupNavItem } from "./TagGroupNavItem";
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
  const [collapsedGroupIds, setCollapsedGroupIds] = useState<Array<number>>([]);

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

  const onGroupToggle = useCallback((id?: Tag["id"]) => {
    if (id == null) return;
    setCollapsedGroupIds((prev) => (prev.includes(id) ? prev.filter((groupId) => groupId !== id) : [...prev, id]));
  }, []);

  const renderedTags = useMemo(() => {
    const groupedTags = sortTagsByName(tagsList.filter(hasChildTags));
    const plainTags = sortTagsByName(tagsList.filter((tag) => !hasChildTags(tag)));
    const renderedGroups = groupedTags.map((tag) => {
      const isCollapsed = tag.id == null ? false : collapsedGroupIds.includes(tag.id);

      return (
        <TagGroupNavItem
          key={tag.id}
          tag={tag}
          selectedTagIds={filter.tagIds}
          isAuth={isAuth}
          isOpen={isOpen}
          isCollapsed={isCollapsed}
          onSelect={onTagClickHandler}
          onToggle={onGroupToggle}
        />
      );
    });
    const renderedPlainTags = plainTags.map((tag) => (
      <TagNavItem
        key={tag.id}
        tag={tag}
        isChecked={Boolean(filter.tagIds?.includes(tag.id))}
        isAuth={isAuth}
        isOpen={isOpen}
        onSelect={onTagClickHandler}
      />
    ));

    return [...renderedGroups, ...renderedPlainTags];
  }, [tagsList, filter.tagIds, isAuth, isOpen, onTagClickHandler, collapsedGroupIds, onGroupToggle]);

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
