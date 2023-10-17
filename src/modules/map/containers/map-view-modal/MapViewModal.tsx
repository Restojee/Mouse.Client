import { getMapByIdThunk, selectCurrentMapContent } from '@/modules/map/containers/map-content/slice';
import { ImageUploadModal } from '@/ui/ImageUploadModal/ImageUploadModal';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useMapView } from './hooks/useMapView';
import { MapContent } from '@/modules/map/containers/map-content';
import { StyledModalWrapper } from '@/ui/Modal/styled';

const MapViewModal = () => {
    const dispatch = useAppDispatch();

    const map = useAppSelector(selectCurrentMapContent);

    const {
        mapId,
        closeMap
    } = useMapView()

    useEffect(() => {
        if (mapId) {
            dispatch(getMapByIdThunk({ mapId }))
        }
    }, [mapId]);

    return (
        <StyledModalWrapper onClick={closeMap}>
            <MapContent map={map}/>
            {/*<ImageUploadModal/>*/}
        </StyledModalWrapper>
    );
};

export default MapViewModal;