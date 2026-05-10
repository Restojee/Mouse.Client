import React, { memo } from "react";
import clsx from "clsx";
import { Tag } from "@/api/codegen/genMouseMapsApi";
import { ChevronRightIcon } from "@/svg/ChevronRightIcon";
import { TagNavItem } from "./TagNavItem";
import styles from "./TagsNavigation.module.scss";

type TagGroupNavItemPropsType = {
  tag: Tag;
  selectedTagIds?: Array<Tag["id"]>;
  isAuth: boolean;
  isOpen: boolean;
  isCollapsed: boolean;
  onSelect: (id?: number) => void;
  onToggle: (id?: number) => void;
};

export const TagGroupNavItem = memo((props: TagGroupNavItemPropsType) => {
  const { tag, selectedTagIds, isAuth, isOpen, isCollapsed, onSelect, onToggle } = props;
  const groupIconClassName = clsx(styles.groupIcon, !isCollapsed && styles.groupIconOpen);

  const handleToggle = () => onToggle(tag.id);

  return (
    <div className={styles.group}>
      <div
        className={styles.groupHeader}
        onClick={handleToggle}
      >
        <span className={styles.groupTitle}>{tag.name}</span>
        <div className={styles.groupActions}>
          <ChevronRightIcon
            size="14px"
            className={groupIconClassName}
          />
        </div>
      </div>
      {!isCollapsed ? (
        <div className={styles.groupList}>
          {tag.childs?.map((child) => (
            <TagNavItem
              key={child.id}
              tag={child}
              isChecked={child.id == null ? false : Boolean(selectedTagIds?.includes(child.id))}
              isAuth={isAuth}
              isOpen={isOpen}
              onSelect={onSelect}
              isNested
            />
          ))}
        </div>
      ) : null}
    </div>
  );
});

TagGroupNavItem.displayName = "TagGroupNavItem";
