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

    const [activeId, setMiniMapActiveId] = useState<Map['id'] | null>(null);

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
            setMiniMapActiveId(map.id);
        }
    }, []);

    const onInitialMapClick = useCallback(() => {
        setMiniMapActiveId(null);
        dispatch(setIsInitialMap(true));
        dispatch(setCurrentMapContent(initialMapContent));
    }, []);

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
        activeId,
        onMapClick,
        isInitialMap,
        addCompletedMap,
        onInitialMapClick,
        deleteCompletedMap,
        isCompletedMapModalOpen,
        onCompletedMapModalOpen,
        onCompletedMapModalClose,
    };
};

