import { Map } from '@/api/codegen/genMouseMapsApi';

export type MapCreateFormType = {
    name: Map['name'];
    image?: Blob;
    tags?: Map['tags'];
}