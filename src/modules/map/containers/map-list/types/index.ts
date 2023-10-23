import { GetMapsApiResponse } from '@/api/codegen/genMouseMapsApi';

export type MapsStateType = GetMapsApiResponse & {
    isMapsFetching: boolean;
}