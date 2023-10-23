import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapContentStateType = {
    mapContent: Map | null;
    isMapImageModalOpen: boolean,
    isMapFetching: boolean;
    selectedModalTagIds: number[];
}

export type UpdateMapImageThunkArgType = {
    mapId: Map['id'];
    file: string;
}