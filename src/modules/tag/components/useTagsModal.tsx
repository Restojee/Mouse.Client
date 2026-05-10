import React, { useMemo } from "react";
import { useTag } from "@/modules/tag/hooks/useTag";
import { hasChildTags } from "@/modules/tag/utils";
import { TagsModalItem } from "./TagsModalItem";
import styles from "./TagsModal.module.scss";

export const useTagsModal = () => {
  const { tagsList, toggleSelectedTag, checkIsSelectedTagId } = useTag();

  const renderedTags = useMemo(
    () =>
      tagsList.map((tag) => {
        if (!hasChildTags(tag)) {
          return (
            <TagsModalItem
              key={tag.id}
              id={tag.id}
              name={tag.name}
              isActive={checkIsSelectedTagId(tag.id)}
              onToggle={toggleSelectedTag}
            />
          );
        }

        return (
          <div
            key={tag.id}
            className={styles.group}
          >
            <div className={styles.groupTitle}>{tag.name}</div>
            <div className={styles.groupItems}>
              {tag.childs?.map((child) => (
                <TagsModalItem
                  key={child.id}
                  id={child.id}
                  name={child.name}
                  isActive={checkIsSelectedTagId(child.id)}
                  onToggle={toggleSelectedTag}
                />
              ))}
            </div>
          </div>
        );
      }),
    [tagsList, toggleSelectedTag, checkIsSelectedTagId],
  );

  return { renderedTags };
};
