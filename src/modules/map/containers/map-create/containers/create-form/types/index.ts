import { Map, Tag } from '@/api/codegen/genMouseMapsApi';

export type MapCreateFormType = {
    name: Map['name'];
    image?: string;
    tags?: Tag['id'][];
}