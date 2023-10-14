import { Tag, Map } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useCallback } from 'react';

export const useMapTag = () => {
    const dispatch = useAppDispatch();

    const onTagsEdit = useCallback((mapId: Map['id'], tagId: Tag['id']): void => {
        alert('редактирование тегов пока не работает');
    }, []);

    return {
        onTagsEdit
    };
};

