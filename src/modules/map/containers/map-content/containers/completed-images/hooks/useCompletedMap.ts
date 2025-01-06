import { Map, MapCompleted } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUserId } from "@/modules/auth/slice";
import React, { useCallback, useMemo } from "react";
import {
  addCompletedMapThunk,
  deleteCompletedMapThunk,
  selectActiveMapCompleted,
  selectCompletedMaps,
  selectIsCompletedModalOpen,
  setActiveMapCompletedById,
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

  const filteredMaps = useMemo(() => {
    // Бэк при невыясненных обстоятельствах возвращает дублированные карты
    const resultMaps: MapCompleted[] = [];

    maps?.forEach((el) => {
      const isMapAlreadyExist = resultMaps?.find((map) => el.user.id === map.user.id);
      if (!isMapAlreadyExist) resultMaps.push(el);
    });

    return resultMaps;
  }, [maps]);

  const onMapClick = useCallback(
    (e?: React.MouseEvent<HTMLDivElement>, id?: MapCompleted["user"]["id"] | null) => {
      const currentElement: HTMLDivElement | undefined = e?.currentTarget;
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
      dispatch(setActiveMapCompletedById(id));
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

  const deleteCompletedMap = useCallback(async () => {
    if (levelId) {
      await dispatch(deleteCompletedMapThunk({ levelId }));
      onClose();
    }
  }, [dispatch, levelId]);

  const onCompletedMapModalClose = useCallback(() => {
    dispatch(setIsCompletedMapModalOpen(false));
  }, [dispatch]);

  const onCompletedMapModalOpen = useCallback(() => {
    dispatch(setIsCompletedMapModalOpen(true));
  }, [dispatch]);

  return {
    maps: filteredMaps,
    isMyMap,
    user: activeMapCompleted?.user,
    onMapClick,
    addCompletedMap,
    deleteCompletedMap,
    activeMapCompleted,
    isCompletedMapModalOpen,
    onCompletedMapModalOpen,
    onCompletedMapModalClose,
  };
};
