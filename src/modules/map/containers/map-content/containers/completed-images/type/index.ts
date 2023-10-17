import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapCompletedStateType = {
    isModalOpen: boolean;
    completedMapsList: Map[]
}