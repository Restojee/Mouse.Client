import { useCallback } from 'react';
import { Tag } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    openTagModal,
    closeTagModal,
    selectTagModalType,
    selectTags,
    createTagThunk,
    deleteTagThunk,
} from '@/modules/tag';
import { ModalType } from '@/modules/tag/types';

export const useTag = () => {
    const dispatch = useAppDispatch();

    const modalType = useAppSelector(selectTagModalType);
    const tagsList = useAppSelector(selectTags);

    const onTagCreate = useCallback(async (name: string) => {
        if (name.trim().length) {
            return dispatch(createTagThunk({ name }));
        }
    }, []);

    const onTagDelete = useCallback((tagId: Tag['id'] | null): void => {
        if (tagId) {
            dispatch(deleteTagThunk({ tagId }));
        }
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
        onOpenModal,
    };
};

