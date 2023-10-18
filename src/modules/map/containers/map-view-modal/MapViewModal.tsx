import { useMap } from '@/modules/map/common';
import {
    useCompletedMap,
} from '@/modules/map/containers/map-content/containers/completed-images/hooks/useCompletedMap';
import { getMapByIdThunk, selectCurrentMapContent } from '@/modules/map/containers/map-content/slice';
import { ImageUploadModal } from '@/ui/ImageUploadModal/ImageUploadModal';
import React, { useCallback, useEffect, useState } from 'react';
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
        closeMap,
    } = useMapView();

    const {
        isMapImageModalOpen,
        onMapImageModalClose,
        onMapImageUpdate
    } = useMap(mapId);

    const {
        isCompletedMapModalOpen,
        onCompletedMapModalClose,
        addCompletedMap,
    } = useCompletedMap();

    const onMapUpdateImage = useCallback(async (image: string) => {
        const res = await onMapImageUpdate(image);
        return Boolean(res);
    }, [mapId]);

    const onCompletedMapUpdateImage = useCallback(async (image: string) => {
        const res = await addCompletedMap(mapId, image);
        return Boolean(res?.payload);
    }, [mapId]);

    useEffect(() => {
        if (mapId) {
            dispatch(getMapByIdThunk({ mapId }));
        }
    }, [mapId]);

    return (
        <>
            <StyledModalWrapper onClick={closeMap}>
                <MapContent map={map}/>
            </StyledModalWrapper>
            <ImageUploadModal
                title={'Обновить обложку карты'}
                isOpen={isMapImageModalOpen}
                onClose={onMapImageModalClose}
                onAccess={onMapUpdateImage}
            />
            <ImageUploadModal
                title={'Добавить свою постройку'}
                isOpen={isCompletedMapModalOpen}
                onClose={onCompletedMapModalClose}
                onAccess={onCompletedMapUpdateImage}
            />
        </>

    );
};

export default MapViewModal;