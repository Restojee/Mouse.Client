import React, { useCallback, useMemo } from "react";
import { selectMapContent } from "@/modules/map/containers/map-content/slice";
import { Map, MapCompleted } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUserId } from "@/modules/auth/slice";
import {
  addCompletedMapThunk,
  deleteCompletedMapThunk,
  selectActiveMapCompleted,
  selectCompletedMaps,
  selectIsCompletedModalOpen,
  setActiveMapCompletedById,
  setIsCompletedMapModalOpen,
} from "../slice";

export const useCompletedMap = (levelId?: Map["id"]) => {
  const dispatch = useAppDispatch();

  const isCompletedMapModalOpen = useAppSelector(selectIsCompletedModalOpen);
  const maps = useAppSelector(selectCompletedMaps);
  const userId = useAppSelector(selectCurrentUserId);
  const activeMapCompleted = useAppSelector(selectActiveMapCompleted);

  const isMyMap = useMemo(() => {
    return activeMapCompleted?.user?.id === userId;
  }, [activeMapCompleted?.user?.id, userId]);

  const filteredMaps = useMemo(() => {
    // Бэк при невыясненных обстоятельствах возвращает дублированные карты
    const resultMaps: MapCompleted[] = [];

      maps?.forEach((el) => {
      const isMapAlreadyExist = resultMaps?.find(map => el.user.id === map.user.id);
      if (!isMapAlreadyExist) resultMaps.push(el);
    });

    return resultMaps;
  }, [maps]);


  const onMapClick = useCallback((e?: React.MouseEvent<HTMLDivElement>, id?: MapCompleted["user"]["id"] | null) => {
    const currentElement: HTMLDivElement | undefined = e?.currentTarget;
    if (currentElement) {
      currentElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    dispatch(setActiveMapCompletedById(id));
  }, [dispatch]);

  const addCompletedMap = useCallback(async (levelId: Map["id"], file: string) => {
    if (levelId && file) {
      return dispatch(addCompletedMapThunk({ levelId, file }));
    }
  }, [dispatch]);

  const deleteCompletedMap = useCallback(() => {
    if (levelId) {
      dispatch(deleteCompletedMapThunk({ levelId }));
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
    onMapClick,
    addCompletedMap,
    deleteCompletedMap,
    activeMapCompleted,
    isCompletedMapModalOpen,
    onCompletedMapModalOpen,
    onCompletedMapModalClose,
  };
};

