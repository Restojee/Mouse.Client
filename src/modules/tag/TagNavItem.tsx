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
  isNested?: boolean;
};

export const TagNavItem = memo(({ tag, isChecked, isAuth, isOpen, onSelect, isNested }: TagNavItemPropsType) => {
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
      margin={isNested ? "0 0 0 12px" : undefined}
    />
  );
});

TagNavItem.displayName = "TagNavItem";
