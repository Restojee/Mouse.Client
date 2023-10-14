import { useCallback } from 'react';
import { Tag } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { openTagModal, closeTagModal, selectTagModalType, selectTags } from '@/modules/tag';
import { ModalType } from '@/modules/tag/types';

export const useTag = () => {
    const dispatch = useAppDispatch();

    const modalType = useAppSelector(selectTagModalType);
    const tagsList = useAppSelector(selectTags);

    const onTagDelete = useCallback((id: Tag['id']): void => {
        alert('удаление тега пока не работает');
    }, []);

    const onTagCreate = useCallback((text: Tag['name']): void => {
        alert('добавление тега пока не работает');
    }, []);

    const onOpenModal = useCallback((modalType: ModalType): void => {
        dispatch(openTagModal(modalType));
    }, []);

    const onCloseModal = useCallback((): void => {
        dispatch(closeTagModal());
    }, []);

    return {
        onTagCreate,
        onTagDelete,
        modalType,
        tagsList,
        onCloseModal,
        onOpenModal
    };
};

