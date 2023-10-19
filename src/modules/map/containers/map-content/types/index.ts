import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapContentStateType = {
    initialMapContent: Map | null;
    currentMapContent: Map | null;
    isMapImageModalOpen: boolean,
    isInitialMap: boolean;
    isImageFetching: boolean;
    selectedModalTagIds: number[];
}

export type UpdateMapImageThunkArgType = {
    mapId: Map['id'];
    file: string;
}