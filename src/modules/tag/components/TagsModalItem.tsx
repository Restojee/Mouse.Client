import React, { memo, useCallback } from "react";
import clsx from "clsx";
import { Typography } from "@/ui/Typography";
import tagStyles from "@/ui/Tag/Tag.module.scss";
import styles from "./TagsModal.module.scss";

type TagsModalItemPropsType = {
  id?: number;
  name?: string;
  isActive: boolean;
  onToggle: (id?: number) => void;
};

export const TagsModalItem = memo(({ id, name, isActive, onToggle }: TagsModalItemPropsType) => {
  const className = clsx(
    tagStyles.tag,
    tagStyles.chips,
    isActive && tagStyles.active,
    styles.chip,
    isActive && styles.chipActive,
  );

  const handleClick = useCallback(() => onToggle(id), [id, onToggle]);

  return (
    <div
      className={className}
      onClick={handleClick}
    >
      <Typography isEllipsis>{name}</Typography>
    </div>
  );
});

TagsModalItem.displayName = "TagsModalItem";
