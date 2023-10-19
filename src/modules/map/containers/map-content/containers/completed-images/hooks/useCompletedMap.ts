import React, { useCallback, useState } from 'react';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCurrentUserId } from '@/modules/auth/slice';
import {
    selectCurrentMapContent,
    selectInitialMapContent,
    selectIsInitialMap,
    setCurrentMapContent,
    setIsInitialMap,
} from '@/modules/map/containers/map-content/slice';
import {
    addCompletedMapThunk,
    deleteCompletedMapThunk,
    selectCompletedMaps,
    selectIsCompletedModalOpen,
    setIsCompletedMapModalOpen,
} from '../slice';

export const useCompletedMap = (mapId?: Map['id']) => {
    const dispatch = useAppDispatch();

    const [activeMapIdentifier, setActiveMapIdentifier] = useState<Map['createdUtcDate'] | null>(null);

    const isCompletedMapModalOpen = useAppSelector(selectIsCompletedModalOpen);
    const maps = useAppSelector(selectCompletedMaps);
    const userId = useAppSelector(selectCurrentUserId);
    const initialMapContent = useAppSelector(selectInitialMapContent);
    const currentMapContent = useAppSelector(selectCurrentMapContent);
    const isInitialMap = useAppSelector(selectIsInitialMap);

    const isMyMap = currentMapContent?.user?.id === userId;

    const onMapClick = useCallback((e?: React.MouseEvent<HTMLDivElement>, map?: Map) => {
        const currentElement: HTMLDivElement | undefined = e?.currentTarget;
        if (currentElement) {
            currentElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }
        if (map) {
            dispatch(setIsInitialMap(false));
            dispatch(setCurrentMapContent(map));
            setActiveMapIdentifier(map.createdUtcDate);
        }
    }, []);

    const onInitialMapClick = useCallback(() => {
        setActiveMapIdentifier(null);
        dispatch(setIsInitialMap(true));
        dispatch(setCurrentMapContent(initialMapContent));
    }, [initialMapContent]);

    const addCompletedMap = useCallback(async (mapId: Map['id'], file: string) => {
        if (mapId && file) {
            return dispatch(addCompletedMapThunk({ mapId, file }));
        }
    }, []);

    const deleteCompletedMap = useCallback(() => {
        if (mapId) {
            dispatch(deleteCompletedMapThunk({ mapId }));
            onInitialMapClick();
        }
    }, [mapId, onInitialMapClick]);

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
        isInitialMap,
        addCompletedMap,
        onInitialMapClick,
        deleteCompletedMap,
        activeMapIdentifier,
        isCompletedMapModalOpen,
        onCompletedMapModalOpen,
        onCompletedMapModalClose,
    };
};

