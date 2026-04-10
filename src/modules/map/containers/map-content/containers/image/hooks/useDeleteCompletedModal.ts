import { useCallback, useMemo } from "react";
import { useSheet } from "@/ui/Sheet";
import { useCompletedMap } from "../../completed-images/hooks/useCompletedMap";
import { useMapView } from "@/modules/map/containers";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUser } from "@/modules/auth/slice";

/**
 * ViewModel: логика удаления прохождения + императивное открытие модалки.
 * Вся бизнес-логика вынесена из View, модалка открывается через useSheet().show().
 */
export const useDeleteCompletedModal = () => {
  const modal = useSheet();
  const currentUser = useAppSelector(selectCurrentUser);
  const { levelId } = useMapView();
  const { activeMapCompleted, deleteCompletedMap, user } = useCompletedMap(levelId);

  const deleteDescription = useMemo(() => {
    if (user?.id !== currentUser?.id) {
      return `Вы действительно хотите удалить прохождение игрока ${user?.username}?`;
    }
    return "Вы действительно хотите удалить свое прохождение?";
  }, [user, currentUser]);

  const showDeleteModal = useCallback(() => {
    const handle = modal.show(null, {
      text: deleteDescription,
      onAccess: async () => {
        if (!activeMapCompleted?.id) return;
        await deleteCompletedMap(activeMapCompleted.id);
        handle.close();
      },
    });
  }, [modal, deleteDescription, activeMapCompleted?.id, deleteCompletedMap]);

  return { showDeleteModal };
};
