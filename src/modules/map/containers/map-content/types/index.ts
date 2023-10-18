import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapContentStateType = {
    initialMapContent: Map | null;
    currentMapContent: Map | null;
    isTagsModalOpen: boolean;
    isMapImageModalOpen: boolean,
    isInitialMap: boolean;
    isImageFetching: boolean;
}

export type UpdateMapImageThunkArgType = {
    mapId: Map['id'];
    file: string;
}