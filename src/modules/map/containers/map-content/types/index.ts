import { Map, MapById } from "@/api/codegen/genMouseMapsApi";

export type MapContentStateType = {
  mapContent: MapById | null;
  isMapImageModalOpen: boolean;
  isMapFetching: boolean;
  selectedModalTagIds: number[];
  previewImageSrc: string | null;
};

export type UpdateMapImageThunkArgType = {
  levelId: Map["id"];
  file: string;
};
