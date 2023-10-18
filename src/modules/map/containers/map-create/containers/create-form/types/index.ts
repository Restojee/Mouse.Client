import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapCreateFormType = {
    name: Map['name'];
    image?: string;
    tags?: Map['tags'];
}