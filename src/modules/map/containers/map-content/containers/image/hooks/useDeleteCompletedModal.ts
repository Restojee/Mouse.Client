import { useCallback, useMemo } from "react";
import { confirmSheet } from "@/ui/Sheet/sheets/confirmSheet";
import { useCompletedMap } from "../../completed-images/hooks/useCompletedMap";
import { useMapView } from "@/modules/map/containers";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/modules/auth/slice";

export const useDeleteCompletedModal = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { levelId } = useMapView();
  const { activeMapCompleted, deleteCompletedMap, user } = useCompletedMap(levelId);

  const deleteDescription = useMemo(() => {
    if (user?.id !== currentUser?.id) {
      return `Вы действительно хотите удалить прохождение игрока ${user?.username}?`;
    }
    return "Вы действительно хотите удалить свое прохождение?";
  }, [user, currentUser]);

  const showDeleteModal = useCallback(async () => {
    const confirmed = await confirmSheet.show({ text: deleteDescription });
    if (confirmed && activeMapCompleted?.id) {
      await deleteCompletedMap(activeMapCompleted.id);
    }
  }, [deleteDescription, activeMapCompleted?.id, deleteCompletedMap]);

  return { showDeleteModal };
};
