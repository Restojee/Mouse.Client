import { useMap } from "@/modules/map/common";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { useCompletedMap } from "../completed-images/hooks/useCompletedMap";
import { IconButton } from "@/ui/Button/IconButton";
import { StyledActionsContainer } from "./styles";
import { EditFillIcon } from "@/svg/EditFillIcon";
import { DeleteIcon } from "@/svg/DeleteIcon";
import { Display } from "@/ui/Display";
import React, { useCallback } from "react";
import { MapCompleted } from "@/api/codegen/genMouseMapsApi";

interface Props {
  onDeleteOpen?: () => void;
  mapCompleted?: MapCompleted | null;
}

export const ImageActions = (props: Props) => {
  const { levelId } = useMapView();

  const { onMapImageModalOpen } = useMap();
  const { activeMapCompleted, isMyMap } = useCompletedMap(levelId);

  const onDeleteClick = useCallback(() => {
    if (!props.mapCompleted) {
      return;
    }

    props.onDeleteOpen?.();
  }, [props]);

  return (
    <StyledActionsContainer>
      <Display condition={!activeMapCompleted}>
        <IconButton
          onClick={onMapImageModalOpen}
          isStylized
        >
          <EditFillIcon />
        </IconButton>
      </Display>
      <Display condition={Boolean(activeMapCompleted && isMyMap)}>
        <IconButton
          onClick={onDeleteClick}
          isStylized
        >
          <DeleteIcon />
        </IconButton>
      </Display>
    </StyledActionsContainer>
  );
};
