import { MapCompleted } from "@/api/codegen/genMouseMapsApi";
import { useMap } from "@/modules/map/common";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { useImageUploadSheet } from "@/ui/ImageUploadModal/useImageUploadSheet";
import { useCallback } from "react";
import { useCompletedMap } from "../completed-images/hooks/useCompletedMap";

type UseImageActionsProps = {
  onDeleteOpen?: () => void;
  mapCompleted?: MapCompleted | null;
};

export const useImageActions = ({ onDeleteOpen, mapCompleted }: UseImageActionsProps) => {
  const { levelId } = useMapView();
  const { onMapImageUpdate } = useMap(levelId);
  const openImageSheet = useImageUploadSheet();
  const { activeMapCompleted, isMyMap } = useCompletedMap(levelId);

  const onMapImageModalOpen = useCallback(() => {
    openImageSheet("Обновить обложку карты", onMapImageUpdate);
  }, [openImageSheet, onMapImageUpdate]);

  const onDeleteClick = useCallback(() => {
    if (!mapCompleted) return;
    onDeleteOpen?.();
  }, [mapCompleted, onDeleteOpen]);

  const showEdit = !activeMapCompleted;
  const showDelete = Boolean(activeMapCompleted && isMyMap);

  return {
    onMapImageModalOpen,
    showEdit,
    showDelete,
    onDeleteClick,
  };
};
