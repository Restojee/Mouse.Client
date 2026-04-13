import React from "react";
import { MapCompleted } from "@/api/codegen/genMouseMapsApi";
import { IconButton } from "@/ui/Button/IconButton";
import { EditFillIcon } from "@/svg/EditFillIcon";
import { DeleteIcon } from "@/svg/DeleteIcon";
import { Display } from "@/ui/Display";
import { ImageActionsContainer } from "./styles/ImageActionsContainer/ImageActionsContainer";
import { useImageActions } from "./useImageActions";

type ImageActionsPropsType = {
  onDeleteOpen?: () => void;
  mapCompleted?: MapCompleted | null;
};

export const ImageActions = (props: ImageActionsPropsType) => {
  const { onMapImageModalOpen, showEdit, showDelete, onDeleteClick } = useImageActions(props);

  return (
    <ImageActionsContainer>
      <Display condition={showEdit}>
        <IconButton
          onClick={onMapImageModalOpen}
          isStylized
        >
          <EditFillIcon />
        </IconButton>
      </Display>
      <Display condition={showDelete}>
        <IconButton
          onClick={onDeleteClick}
          isStylized
        >
          <DeleteIcon />
        </IconButton>
      </Display>
    </ImageActionsContainer>
  );
};
