import React, { useCallback } from 'react';
import { selectMapContent } from '@/modules/map/containers/map-content/slice';
import { Map, MapCompleted } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCurrentUserId } from '@/modules/auth/slice';
import {
    addCompletedMapThunk,
    deleteCompletedMapThunk,
    selectActiveMapCompleted,
    selectCompletedMaps,
    selectIsCompletedModalOpen,
    setActiveMapCompletedById,
    setIsCompletedMapModalOpen,
} from '../slice';

export const useCompletedMap = (mapId?: Map['id']) => {
    const dispatch = useAppDispatch();

    const isCompletedMapModalOpen = useAppSelector(selectIsCompletedModalOpen);
    const maps = useAppSelector(selectCompletedMaps);
    const userId = useAppSelector(selectCurrentUserId);
    const mapContent = useAppSelector(selectMapContent);
    const activeMapCompleted = useAppSelector(selectActiveMapCompleted);

    const isMyMap = mapContent?.user?.id === userId;

    const onMapClick = useCallback((e?: React.MouseEvent<HTMLDivElement>, id?: MapCompleted['user']['id'] | null) => {
        const currentElement: HTMLDivElement | undefined = e?.currentTarget;
        if (currentElement) {
            currentElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
        dispatch(setActiveMapCompletedById(id));
    }, []);

    const addCompletedMap = useCallback(async (mapId: Map['id'], file: string) => {
        if (mapId && file) {
            return dispatch(addCompletedMapThunk({ mapId, file }));
        }
    }, []);

    const deleteCompletedMap = useCallback(() => {
        if (mapId) {
            dispatch(deleteCompletedMapThunk({ mapId }));
        }
    }, [mapId]);

    const onCompletedMapModalClose = useCallback(() => {
        dispatch(setIsCompletedMapModalOpen(false));
    }, []);

    const onCompletedMapModalOpen = useCallback(() => {
        dispatch(setIsCompletedMapModalOpen(true));
    }, []);

    return {
        maps,
        isMyMap,
        onMapClick,
        addCompletedMap,
        deleteCompletedMap,
        activeMapCompleted,
        isCompletedMapModalOpen,
        onCompletedMapModalOpen,
        onCompletedMapModalClose,
    };
};

