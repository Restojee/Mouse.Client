import { GetTipApiResponse, Tip } from '@/api/codegen/genMouseMapsApi';

export type InfoStateType = {
    info: GetTipApiResponse | null;
    isCreateModalOpen: boolean;
    isInfoFetching: boolean;
    selectedInfo: Tip | null;
}