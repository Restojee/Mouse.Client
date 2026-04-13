import React from "react";
import { Tag } from "@/api/codegen/genMouseMapsApi";
import { NavLinkSection } from "@/layout/navigation/styles/NavLinkSection";
import { CloseIcon } from "@/svg/CloseIcon";
import { EditIcon } from "@/svg/EditIcon";
import styles from "./Tag.module.scss";
import { useTagItemActions } from "./useTagItemActions";

type TagItemActionsPropsType = {
  tag: Tag;
};

export const TagItemActions = (props: TagItemActionsPropsType) => {
  const { isAdmin, onTagEditHandler, onTagDeleteHandler } = useTagItemActions(props);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.tagActions}>
      <NavLinkSection onClick={onTagEditHandler}>
        <EditIcon />
      </NavLinkSection>
      <NavLinkSection onClick={onTagDeleteHandler}>
        <CloseIcon />
      </NavLinkSection>
    </div>
  );
};
