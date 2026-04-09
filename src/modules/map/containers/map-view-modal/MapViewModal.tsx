import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMap } from "@/modules/map/common";
import { GlobalThemes } from "@/layout/theme/constants";
import { ImageUploadModal } from "@/ui/ImageUploadModal/ImageUploadModal";
import { MobileSheet } from "@/ui/MobileSheet/MobileSheet";
import { StyledModalWrapper } from "@/ui/Modal/styled";
import React, { useCallback, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { MapContent } from "../map-content";
import { useCompletedMap } from "../map-content/containers/completed-images/hooks/useCompletedMap";
import { onOpenMapContentThunk } from "../map-content/slice";
import { useMapView } from "./hooks/useMapView";

const darkTheme = GlobalThemes["DARK"];

const MapViewModal = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

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
      {isMobile ? (
        <ThemeProvider theme={darkTheme}>
          <MobileSheet
            isOpen={Boolean(levelId)}
            onClose={closeMap}
            zIndex={201}
            noHeader
            bgColor={darkTheme.colors.primary}
            height="95dvh"
          >
            {Boolean(levelId) && <MapContent />}
          </MobileSheet>
        </ThemeProvider>
      ) : levelId ? (
        <StyledModalWrapper onClick={closeMap}>
          <MapContent />
        </StyledModalWrapper>
      ) : null}
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
