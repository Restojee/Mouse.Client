import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useMap } from "@/modules/map/common";
import { ImageUploadSheet } from "@/ui/ImageUploadModal/ImageUploadSheet";
import { useSheetZIndex } from "@/ui/Sheet/viewModel";
import { AsyncSheet } from "@/ui/Sheet/view";
import React, { useCallback, useEffect } from "react";
import { MapContent } from "../map-content";
import { useCompletedMap } from "../map-content/containers/completed-images/hooks/useCompletedMap";
import { onOpenMapContentThunk } from "../map-content/slice";
import { useMapView } from "./hooks/useMapView";
import { ThemeKey } from "@/layout/theme/types";

const MapViewModal = () => {
  const dispatch = useAppDispatch();
  const zIndex = useSheetZIndex();

  const { levelId, closeMap } = useMapView();

  const { isMapImageModalOpen, onMapImageModalClose, onMapImageUpdate } = useMap(levelId);
  const { isCompletedMapModalOpen, onCompletedMapModalClose, addCompletedMap } = useCompletedMap();

  const onMapUpdateImage = useCallback(
    async (image: string) => {
      const res = await onMapImageUpdate(image);
      return Boolean(res);
    },
    [onMapImageUpdate],
  );

  const onCompletedMapUpdateImage = useCallback(
    async (image: string) => {
      const res = await addCompletedMap(levelId, image);
      return Boolean(res?.payload);
    },
    [addCompletedMap, levelId],
  );

  useEffect(() => {
    if (levelId) {
      dispatch(onOpenMapContentThunk({ levelId }));
    }
  }, [levelId]);

  return (
    <>
      <AsyncSheet
        theme={ThemeKey.DARK}
        isOpen={Boolean(levelId)}
        onClose={closeMap}
        noHeader
        padding={0}
        height="95dvh"
        width="100%"
        zIndex={zIndex}
        withoutButtons
        withoutTitle
      >
        <MapContent />
      </AsyncSheet>
      <ImageUploadSheet
        title="Обновить обложку карты"
        isOpen={isMapImageModalOpen}
        onClose={onMapImageModalClose}
        onAccess={onMapUpdateImage}
      />
      <ImageUploadSheet
        title="Добавить свою постройку"
        isOpen={isCompletedMapModalOpen}
        onClose={onCompletedMapModalClose}
        onAccess={onCompletedMapUpdateImage}
      />
    </>
  );
};

export default MapViewModal;
