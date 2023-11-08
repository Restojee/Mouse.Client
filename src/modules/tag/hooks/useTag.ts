import { setAppModalType } from '@/bll/appReducer';
import { selectMapTags, setMapTagIds } from '@/modules/map/containers';
import {
    selectSelectedTagIds,
    toggleSelectedTagById,
    updateMapTagsThunk,
} from '@/modules/map/containers/map-content/slice';
import { TagModalTypes } from '@/modules/tag/types';
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

    const { levelId } = router.query;

    const selectedTagIds = useAppSelector(selectSelectedTagIds);
    const modalType = useAppSelector(selectTagModalType);
    const selectedIdForCreateMap = useAppSelector(selectMapTags);
    const tagsList = useAppSelector(selectTags);

    const [selectedTagIdsForCreateMap, setSelectedTagIdsForCreateMap] = useState<Tag['id'][]>(selectedTagIds || []);

    const onTagCreate = useCallback(async (name: string) => {
        if (name.trim().length) {
            return dispatch(createTagThunk({ name }));
        }
    }, []);

    const onOpenModal = useCallback((modalType: TagModalTypes): void => {
        if(modalType === 'tag-update') {
            dispatch(setAppModalType('tag-update'));
            return;
        }
        dispatch(setTagModalType(modalType));
    }, []);

    const onCloseModal = useCallback((): void => {
        dispatch(setAppModalType(null));
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
        const id = Number(levelId);
        if (levelId) {
            dispatch(updateMapTagsThunk(id));
        } else {
            dispatch(setMapTagIds(selectedTagIdsForCreateMap));
            onCloseModal();
        }
    }, [levelId, selectedTagIdsForCreateMap]);

    const toggleSelectedTag = useCallback((id: Tag['id']) => {
        if (id && levelId) {
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
    }, [levelId, selectedTagIdsForCreateMap]);

    const checkIsSelectedTagId = useCallback((id: Tag['id']) => {
        if (id && levelId) {
            return selectedTagIds.includes(id);
        }

        if (id && !levelId) {
            return selectedTagIdsForCreateMap.includes(id);
        }
        return false;
    }, [levelId, selectedTagIds, selectedTagIdsForCreateMap]);

    useEffect(() => {
        if(!selectedIdForCreateMap?.length) {
            setSelectedTagIdsForCreateMap([])
        }
    }, [selectedIdForCreateMap])

    return {
        onTagCreate,
        onTagDelete,
        tagsList,
        onCloseModal,
        modalType,
        onOpenModal,
        updateMapTags,
        toggleSelectedTag,
        checkIsSelectedTagId,
        selectedIdForCreateMap,
    };
};

