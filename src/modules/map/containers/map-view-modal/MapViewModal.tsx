import React, { useEffect } from 'react';
import { getMapByIdThunk, selectMapContent } from '@/modules/map/containers/map-list/slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useMapView } from './hooks/useMapView';
import { MapContent } from '@/modules/map/containers/map-content';
import { StyledModalWrapper } from '@/ui/Modal/styled';

const MapViewModal = () => {
    const dispatch = useAppDispatch();

    const {mapId} = useMapView()
    const map = useAppSelector(selectMapContent);

    useEffect(() => {
        if (mapId) {
            dispatch(getMapByIdThunk({ mapId }))
        }
    }, [mapId]);

    return (
        <StyledModalWrapper>
            <MapContent map={map}/>
        </StyledModalWrapper>
    );
};

export default MapViewModal;