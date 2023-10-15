import { useCallback } from 'react';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { closeTagsModal, openTagsModal, selectIsTagsModalOpen } from '@/modules/map/containers/map-content/slice';

export const useMapTag = () => {
    const dispatch = useAppDispatch();

    const isModalOpen = useAppSelector(selectIsTagsModalOpen);

    const onTagsEdit = useCallback((mapId: Map['id']): void => {
        alert('редактирование тегов пока не работает');
    }, []);

    const onModalClose = useCallback((mapId: Map['id']): void => {
        dispatch(closeTagsModal());
    }, []);

    const onModalOpen = useCallback((): void => {
        dispatch(openTagsModal());
    }, []);

    return {
        onTagsEdit,
        onModalClose,
        isModalOpen,
        onModalOpen,
    };
};

