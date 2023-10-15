import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapContentStateType = {
    mapContent: Map | null;
    isTagsModalOpen: boolean;
}