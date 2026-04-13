import React, { memo } from "react";
import { Tag } from "@/api/codegen/genMouseMapsApi";
import { NavLink } from "@/layout/navigation/NavLink";
import { TagItemActions } from "@/modules/tag/components/TagItemActions";

type TagNavItemPropsType = {
  tag: Tag;
  isChecked: boolean;
  isAuth: boolean;
  isOpen: boolean;
  onSelect: (id?: number) => void;
};

export const TagNavItem = memo(({ tag, isChecked, isAuth, isOpen, onSelect }: TagNavItemPropsType) => {
  const handleClick = () => onSelect(tag.id);

  return (
    <NavLink
      label={tag.name}
      description={tag.description}
      onClick={handleClick}
      isChecked={isChecked}
      append={isAuth ? <TagItemActions tag={tag} /> : undefined}
      justifyContent="space-between"
      isOpen={isOpen}
    />
  );
});

TagNavItem.displayName = "TagNavItem";
