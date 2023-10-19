import { Map, User } from '@/api/codegen/genMouseMapsApi';

export type MapCompletedStateType = {
    isModalOpen: boolean;
    completedMapsList: Map[];
    activeMapIdentifier: User['id'] | null
}