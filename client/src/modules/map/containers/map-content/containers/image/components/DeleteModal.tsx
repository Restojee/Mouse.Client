import { Modal } from "@/ui/Modal/Modal";
import React, { useCallback, useMemo } from "react";
import { useCompletedMap } from "../../completed-images/hooks/useCompletedMap";
import { useMapView } from "@/modules/map/containers";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/modules/auth/slice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteModal = (props: Props) => {
  const currentUser = useAppSelector(selectCurrentUser);

  const { levelId } = useMapView();
  const { activeMapCompleted, deleteCompletedMap, user } = useCompletedMap(levelId);

  const deleteDescription = useMemo(() => {
    if (user?.id !== currentUser?.id) {
      return `Вы действительно хотите удалить прохождение игрока ${user?.username}?`;
    }

    return "Вы действительно хотите удалить свое прохождение?";
  }, [user, currentUser]);

  const onCompletedMapDelete = useCallback(async () => {
    if (!activeMapCompleted?.id) {
      return;
    }

    await deleteCompletedMap(activeMapCompleted.id);
    props.onClose();
  }, [activeMapCompleted?.id, deleteCompletedMap, props]);

  return (
    <Modal
      isOpen={props.isOpen}
      text={deleteDescription}
      onAccess={onCompletedMapDelete}
      onClose={props.onClose}
    />
  );
};
