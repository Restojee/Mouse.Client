import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapContentStateType = {
    initialMapContent: Map | null;
    currentMapContent: Map | null;
    isTagsModalOpen: boolean;
}