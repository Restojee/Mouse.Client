import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useMap } from "@/modules/map/common";
import { ImageUploadModal } from "@/ui/ImageUploadModal/ImageUploadModal";
import { StyledModalWrapper } from "@/ui/Modal/styled";
import React, { useCallback, useEffect } from "react";
import { MapContent } from "../map-content";
import { useCompletedMap } from "../map-content/containers/completed-images/hooks/useCompletedMap";
import { onOpenMapContentThunk } from "../map-content/slice";
import { useMapView } from "./hooks/useMapView";

const MapViewModal = () => {
  const dispatch = useAppDispatch();

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
      <StyledModalWrapper onClick={closeMap}>
        <MapContent />
      </StyledModalWrapper>
      <ImageUploadModal
        title={"Обновить обложку карты"}
        isOpen={isMapImageModalOpen}
        onClose={onMapImageModalClose}
        onAccess={onMapUpdateImage}
      />
      <ImageUploadModal
        title={"Добавить свою постройку"}
        isOpen={isCompletedMapModalOpen}
        onClose={onCompletedMapModalClose}
        onAccess={onCompletedMapUpdateImage}
      />
    </>
  );
};

export default MapViewModal;
