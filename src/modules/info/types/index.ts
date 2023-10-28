import { Tip } from '@/api/codegen/genMouseMapsApi';

export type InfoStateType = {
    infoList: Tip[];
    count: number | null;
    isCreateModalOpen: boolean;
    isInfoFetching: boolean;
    selectedInfo: Tip | null;
}