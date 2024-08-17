import { Tag } from "@/api/codegen/genMouseMapsApi";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { StyledTagActions } from "@/modules/tag/components/styled";
import { useTag } from "@/modules/tag/hooks/useTag";
import { CloseIcon } from "@/svg/CloseIcon";
import { EditIcon } from "@/svg/EditIcon";
import { StyledBox } from "@/ui/Box";
import React from "react";

interface Props {
  tag: Tag;
  setTempTag: (tag: Tag) => void;
}
export const TagItemActions = (props: Props) => {
  const {
    onOpenModal,
  } = useTag();

  const onTagEditHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.setTempTag(props.tag);
    onOpenModal('tag-update');
  };

  const onTagDeleteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.setTempTag(props.tag);
    onOpenModal('tag-delete');
  };

  return (
    <StyledTagActions>
      <StyledNavLinkSection onClick={onTagEditHandler}>
        <EditIcon/>
      </StyledNavLinkSection>
      <StyledNavLinkSection onClick={onTagDeleteHandler}>
        <CloseIcon/>
      </StyledNavLinkSection>
    </StyledTagActions>
  );
};

