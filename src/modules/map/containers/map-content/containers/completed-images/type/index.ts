import { MapCompleted } from '@/api/codegen/genMouseMapsApi';

export type MapCompletedStateType = {
    isModalOpen: boolean;
    completedMapsList: MapCompleted[];
    activeMapCompleted: MapCompleted | null;
}