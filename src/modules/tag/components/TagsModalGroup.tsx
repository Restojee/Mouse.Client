import React, { memo, useCallback } from "react";
import { Tag } from "@/api/codegen/genMouseMapsApi";
import { ChevronRightIcon } from "@/svg/ChevronRightIcon";
import { Typography } from "@/ui/Typography";
import { TagsModalItem } from "./TagsModalItem";
import styles from "./TagsModal.module.scss";

type TagsModalGroupPropsType = {
  id?: number;
  name?: string;
  tags: Tag[];
  collapsed: boolean;
  onToggleGroup: (id?: number) => void;
  onToggleTag: (id?: number) => void;
  checkIsSelectedTagId: (id?: number) => boolean;
};

export const TagsModalGroup = memo(
  ({ id, name, tags, collapsed, onToggleGroup, onToggleTag, checkIsSelectedTagId }: TagsModalGroupPropsType) => {
    const handleToggleGroup = useCallback(() => onToggleGroup(id), [id, onToggleGroup]);
    const groupContentId = id ? `tags-modal-group-${id}` : undefined;
    const iconClassName = collapsed ? styles.groupIcon : `${styles.groupIcon} ${styles.groupIconCollapsed}`;
    const hasTags = tags.length > 0;
    const isContentVisible = hasTags && !collapsed;

    return (
      <div className={styles.group}>
        <button
          type="button"
          className={styles.groupHeader}
          onClick={handleToggleGroup}
          aria-expanded={!collapsed}
          aria-controls={groupContentId}
        >
          <span className={iconClassName}>
            <ChevronRightIcon />
          </span>
          <Typography className={styles.groupTitle}>{name}</Typography>
        </button>
        {isContentVisible ? (
          <div
            id={groupContentId}
            className={styles.groupItems}
          >
            {tags.map((tag) => (
              <TagsModalItem
                key={tag.id}
                id={tag.id}
                name={tag.name}
                isActive={checkIsSelectedTagId(tag.id)}
                onToggle={onToggleTag}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

TagsModalGroup.displayName = "TagsModalGroup";
