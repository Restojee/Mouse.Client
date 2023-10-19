import { selectMapTags, setMapTagIds } from '@/modules/map/containers';
import {
    selectSelectedTagIds,
    toggleSelectedTagById,
    updateMapTagsThunk,
} from '@/modules/map/containers/map-content/slice';
import { ModalType } from '@/modules/tag/types';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Tag } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    selectTagModalType,
    selectTags,
    createTagThunk,
    deleteTagThunk,
    setTagModalType,
} from '@/modules/tag';

export const useTag = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { mapId } = router.query;

    const [selectedTagIdsForCreateMap, setSelectedTagIdsForCreateMap] = useState<Tag['id'][]>([]);

    const modalType = useAppSelector(selectTagModalType);
    const selectedTagIds = useAppSelector(selectSelectedTagIds);
    const selectedIdForCreateMap = useAppSelector(selectMapTags);
    const tagsList = useAppSelector(selectTags);

    const onTagCreate = useCallback(async (name: string) => {
        if (name.trim().length) {
            return dispatch(createTagThunk({ name }));
        }
    }, []);

    const onOpenModal = useCallback((modalType: ModalType): void => {
        dispatch(setTagModalType(modalType));
    }, []);

    const onCloseModal = useCallback((): void => {
        dispatch(setTagModalType(null));
    }, []);

    const onTagDelete = useCallback(async (tagId: Tag['id'] | null): Promise<boolean> => {
        if (tagId) {
            const res = await dispatch(deleteTagThunk({ tagId }))
            if (res.payload) {
                onCloseModal()
            }
        }
        return false
    }, []);

    const updateMapTags = useCallback((): void => {
        const id = Number(mapId);
        if (mapId) {
            dispatch(updateMapTagsThunk(id));
        } else {
            dispatch(setMapTagIds(selectedTagIdsForCreateMap));
            dispatch(setTagModalType(null))
        }
    }, [mapId, selectedTagIdsForCreateMap]);

    const toggleSelectedTag = useCallback((id: Tag['id']) => {
        if (id && mapId) {
            dispatch(toggleSelectedTagById(id));
            return;
        }

        if (id && !selectedTagIdsForCreateMap?.includes(id)) {
            setSelectedTagIdsForCreateMap(prev => [...prev, id]);
            return;
        }
        if (id && selectedTagIdsForCreateMap?.includes(id)) {
            const filteredTagIds = selectedTagIdsForCreateMap.filter(tagId => tagId !== id);
            setSelectedTagIdsForCreateMap(filteredTagIds);
            return;
        }
    }, [mapId, selectedTagIdsForCreateMap]);

    const checkIsSelectedTagId = useCallback((id: Tag['id']) => {
        if (id && mapId) {
            return selectedTagIds.includes(id);
        }

        if (id && !mapId) {
            return selectedTagIdsForCreateMap.includes(id);
        }
        return false;
    }, [mapId, selectedTagIds, selectedTagIdsForCreateMap]);

    useEffect(() => {
        if(!selectedIdForCreateMap?.length) {
            setSelectedTagIdsForCreateMap([])
        }
    }, [selectedIdForCreateMap])

    return {
        onTagCreate,
        onTagDelete,
        modalType,
        tagsList,
        onCloseModal,
        onOpenModal,
        updateMapTags,
        toggleSelectedTag,
        checkIsSelectedTagId,
        selectedIdForCreateMap,
    };
};

