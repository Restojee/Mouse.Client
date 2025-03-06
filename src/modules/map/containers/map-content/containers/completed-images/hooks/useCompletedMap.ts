import { Map, MapCompleted } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUserId } from "@/modules/auth/slice";
import { useCallback, useMemo } from "react";
import {
  addCompletedMapThunk,
  deleteCompletedMapThunk,
  selectActiveMapCompleted,
  selectCompletedMaps,
  selectIsCompletedModalOpen,
  setActiveMapCompleted,
  setIsCompletedMapModalOpen,
} from "../slice";
import { usePopup } from "@/hooks/usePopup";

export const useCompletedMap = (levelId?: Map["id"]) => {
  const dispatch = useAppDispatch();

  const isCompletedMapModalOpen = useAppSelector(selectIsCompletedModalOpen);
  const maps = useAppSelector(selectCompletedMaps);
  const userId = useAppSelector(selectCurrentUserId);
  const activeMapCompleted = useAppSelector(selectActiveMapCompleted);
  const { onClose } = usePopup("completed-delete");

  const isMyMap = useMemo(() => {
    return activeMapCompleted?.user?.id === userId;
  }, [activeMapCompleted?.user?.id, userId]);

  const mapsByUser = useMemo(() => {
    const resultMaps: Record<number, MapCompleted & { count?: number }> = {};

    maps?.forEach((el) => {
      const userId = el.user?.id;
      if (!userId) {
        return;
      }

      if (!resultMaps[userId]) {
        resultMaps[userId] = { ...el, count: 0 };
      }

      resultMaps[userId].count! += 1;
    });

    return Object.values(resultMaps);
  }, [maps]);

  const onMapClick = useCallback(
    (map: MapCompleted | null) => {
      dispatch(setActiveMapCompleted(map));
    },
    [dispatch],
  );

  const addCompletedMap = useCallback(
    async (levelId: Map["id"], file: string) => {
      if (levelId && file) {
        return dispatch(addCompletedMapThunk({ levelId, file }));
      }
    },
    [dispatch],
  );

  const deleteCompletedMap = useCallback(
    async (completedId: MapCompleted["id"]) => {
      if (levelId && completedId) {
        await dispatch(deleteCompletedMapThunk({ levelId, completedId }));
        onClose();
      }
    },
    [dispatch, levelId, onClose],
  );

  const onCompletedMapModalClose = useCallback(() => {
    dispatch(setIsCompletedMapModalOpen(false));
  }, [dispatch]);

  const onCompletedMapModalOpen = useCallback(() => {
    dispatch(setIsCompletedMapModalOpen(true));
  }, [dispatch]);

  const selectedCompletedMaps = useMemo(() => {
    const result = maps?.filter((el) => el && el.user.id === activeMapCompleted?.user.id);
    return result.length ? result : null;
  }, [activeMapCompleted?.user.id, maps]);

  const changeActiveCompletedMap = useCallback(
    (map: MapCompleted) => {
      dispatch(setActiveMapCompleted(map));
    },
    [dispatch],
  );

  return {
    maps: mapsByUser,
    selectedCompletedMaps,
    isMyMap,
    user: activeMapCompleted?.user,
    onMapClick,
    addCompletedMap,
    deleteCompletedMap,
    activeMapCompleted,
    changeActiveCompletedMap,
    isCompletedMapModalOpen,
    onCompletedMapModalOpen,
    onCompletedMapModalClose,
  };
};
