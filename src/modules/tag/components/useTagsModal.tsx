import React, { useCallback, useMemo, useState } from "react";
import { useTag } from "@/modules/tag/hooks/useTag";
import { hasChildTags } from "@/modules/tag/utils";
import { TagsModalItem } from "./TagsModalItem";
import { TagsModalGroup } from "./TagsModalGroup";
import styles from "./TagsModal.module.scss";

const EMPTY_TAGS: never[] = [];

export const useTagsModal = () => {
  const { tagsList, toggleSelectedTag, checkIsSelectedTagId } = useTag();
  const [collapsedGroupIds, setCollapsedGroupIds] = useState<number[]>([]);

  const toggleCollapsedGroup = useCallback((id?: number) => {
    if (!id) return;

    setCollapsedGroupIds((ids) => {
      const isCollapsed = ids.includes(id);

      return isCollapsed ? ids.filter((groupId) => groupId !== id) : [...ids, id];
    });
  }, []);

  const groupedTags = useMemo(() => tagsList.filter(hasChildTags), [tagsList]);
  const plainTags = useMemo(() => tagsList.filter((tag) => !hasChildTags(tag)), [tagsList]);

  const renderedGroups = useMemo(
    () =>
      groupedTags.map((tag) => (
        <TagsModalGroup
          key={tag.id}
          id={tag.id}
          name={tag.name}
          tags={tag.childs ?? EMPTY_TAGS}
          collapsed={tag.id ? collapsedGroupIds.includes(tag.id) : false}
          onToggleGroup={toggleCollapsedGroup}
          onToggleTag={toggleSelectedTag}
          checkIsSelectedTagId={checkIsSelectedTagId}
        />
      )),
    [groupedTags, collapsedGroupIds, toggleCollapsedGroup, toggleSelectedTag, checkIsSelectedTagId],
  );

  const renderedPlainTags = useMemo(
    () =>
      plainTags.map((tag) => (
        <TagsModalItem
          key={tag.id}
          id={tag.id}
          name={tag.name}
          isActive={checkIsSelectedTagId(tag.id)}
          onToggle={toggleSelectedTag}
        />
      )),
    [plainTags, toggleSelectedTag, checkIsSelectedTagId],
  );

  const hasGroups = renderedGroups.length > 0;
  const hasPlainTags = renderedPlainTags.length > 0;
  const groupsClassName = styles.groups;
  const plainTagsClassName = styles.plainTags;

  return { renderedGroups, renderedPlainTags, hasGroups, hasPlainTags, groupsClassName, plainTagsClassName };
};
