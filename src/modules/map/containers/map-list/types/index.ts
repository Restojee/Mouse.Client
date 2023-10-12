import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapsStateType = {
    mapsList: Map[];
    mapContent: Map | null;
}