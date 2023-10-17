import { Map } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectInitialMapContent, setCurrentMapContent } from '@/modules/map/containers/map-content/slice';
import React, { useCallback, useEffect, useState } from 'react';
import { addCompletedMapThunk, getCompletedMapsThunk, selectCompletedMaps } from '../slice';

export const useCompletedMap = (mapId: Map['id']) => {
    const dispatch = useAppDispatch();

    const [activeId, setMiniMapActiveId] = useState<Map['id'] | null>(null);

    const maps = useAppSelector(selectCompletedMaps);
    const initialMapContent = useAppSelector(selectInitialMapContent);

    const onMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>, map: Map) => {
        const currentElement: HTMLDivElement = e.currentTarget;
        if (currentElement) {
            currentElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center',
            });
        }

        dispatch(setCurrentMapContent(map));
        setMiniMapActiveId(map.id)
    }, []);

    const onInitialMapClick = useCallback(() => {
        setMiniMapActiveId(null)
        dispatch(setCurrentMapContent(initialMapContent));
    }, [])

    const addCompletedMap = useCallback((mapId: Map['id'], file: Map['image']) => {
        if(mapId && file){
            // dispatch(addCompletedMapThunk({mapId, body: {file}}))
        }
    }, [])

    useEffect(() => {
        dispatch(getCompletedMapsThunk({ mapId }));
    }, []);

    return {
        maps,
        activeId,
        onMapClick,
        addCompletedMap,
        onInitialMapClick
    };
};

