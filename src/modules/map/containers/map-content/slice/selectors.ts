import { RootState } from "@/store";

export const selectSelectedTagIds = (state: RootState) => state.map.selectedModalTagIds;
export const selectMapContent = (state: RootState) => state.map.mapContent;
export const selectIsMapImageModalOpen = (state: RootState) => state.map.isMapImageModalOpen;
export const selectIsMapFetching = (state: RootState) => state.map.isMapFetching;
export const selectPreviewImageSrc = (state: RootState) => state.map.previewImageSrc;
