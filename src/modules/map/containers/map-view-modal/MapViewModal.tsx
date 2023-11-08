import React, { useCallback, useEffect } from 'react';
import { useMap } from '@/modules/map/common';
import { useCompletedMap, } from '../map-content/containers/completed-images/hooks/useCompletedMap';
import { onOpenMapContentThunk } from '../map-content/slice';
import { ImageUploadModal } from '@/ui/ImageUploadModal/ImageUploadModal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useMapView } from './hooks/useMapView';
import { MapContent } from '../map-content';
import { StyledModalWrapper } from '@/ui/Modal/styled';

const MapViewModal = () => {
    const dispatch = useAppDispatch();

    const {
        levelId,
        closeMap,
    } = useMapView();

    const {
        isMapImageModalOpen,
        onMapImageModalClose,
        onMapImageUpdate
    } = useMap(levelId);

    const {
        isCompletedMapModalOpen,
        onCompletedMapModalClose,
        addCompletedMap,
    } = useCompletedMap();

    const onMapUpdateImage = useCallback(async (image: string) => {
        const res = await onMapImageUpdate(image);
        return Boolean(res);
    }, [levelId]);

    const onCompletedMapUpdateImage = useCallback(async (image: string) => {
        const res = await addCompletedMap(levelId, image);
        return Boolean(res?.payload);
    }, [levelId]);

    useEffect(() => {
        if (levelId) {
            dispatch(onOpenMapContentThunk({ levelId }))
        }
    }, [levelId]);

    return (
        <>
            <StyledModalWrapper onClick={closeMap}>
                <MapContent />
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