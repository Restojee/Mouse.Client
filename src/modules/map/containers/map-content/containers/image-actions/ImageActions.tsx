import { useMap } from "@/modules/map/common";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { useCompletedMap } from "../completed-images/hooks/useCompletedMap";
import { IconButton } from "@/ui/Button/IconButton";
import { StyledActionsContainer } from "./styles";
import { EditFillIcon } from "@/svg/EditFillIcon";
import { DeleteIcon } from "@/svg/DeleteIcon";
import { Display } from "@/ui/Display";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/modules/auth/slice";
import { Modal } from "@/ui/Modal/Modal";
import React, { useMemo } from "react";
import { usePopup } from "@/hooks/usePopup";

export const ImageActions = () => {
  const { levelId } = useMapView();

  const currentUser = useAppSelector(selectCurrentUser);

  const { onMapImageModalOpen } = useMap();
  const { onOpen, onClose, isOpen } = usePopup("completed-delete");

  const { activeMapCompleted, isMyMap, deleteCompletedMap, user } = useCompletedMap(levelId);

  const deleteDescription = useMemo(() => {
    if (user?.id !== currentUser?.id) {
      return `Вы действительно хотите удалить прохождение игрока ${user?.username}?`;
    }

    return "Вы действительно хотите удалить свое прохождение?";
  }, [user, currentUser]);

  return (
    <>
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
            onClick={onOpen}
            isStylized
          >
            <DeleteIcon />
          </IconButton>
        </Display>
      </StyledActionsContainer>
      <Modal
        isOpen={isOpen}
        text={deleteDescription}
        onAccess={deleteCompletedMap}
        onClose={onClose}
      />
    </>
  );
};
