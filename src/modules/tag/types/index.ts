import { Tag } from '@/api/codegen/genMouseMapsApi';

export type ModalType = 'delete' | 'create' | null;

export type TagsStateType = {
    modalType: ModalType,
    tagsList: Tag[];
}
