import { Map, MapById } from '@/api/codegen/genMouseMapsApi';

export type MapContentStateType = {
    mapContent: MapById | null;
    isMapImageModalOpen: boolean,
    isMapFetching: boolean;
    selectedModalTagIds: number[];
}

export type UpdateMapImageThunkArgType = {
    levelId: Map['id'];
    file: string;
}