import { Tag } from "@/api/codegen/genMouseMapsApi";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { useTag } from "@/modules/tag/hooks/useTag";
import styles from "./Tag.module.scss";
import { CloseIcon } from "@/svg/CloseIcon";
import { EditIcon } from "@/svg/EditIcon";
import React from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAdmin } from "@/modules/auth/slice";

interface Props {
  tag: Tag;
  setTempTag: (tag: Tag) => void;
}

export const TagItemActions = (props: Props) => {
  const { onOpenModal } = useTag();
  const isAdmin = useAppSelector(selectIsAdmin);

  const onTagEditHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.setTempTag(props.tag);
    onOpenModal("tag-update");
  };

  const onTagDeleteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.setTempTag(props.tag);
    onOpenModal("tag-delete");
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.tagActions}>
      <StyledNavLinkSection onClick={onTagEditHandler}>
        <EditIcon />
      </StyledNavLinkSection>
      <StyledNavLinkSection onClick={onTagDeleteHandler}>
        <CloseIcon />
      </StyledNavLinkSection>
    </div>
  );
};
