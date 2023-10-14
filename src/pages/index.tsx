import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { Display } from '@/ui/Display';
import React, { Suspense, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AsyncMapViewModal } from '@/modules/map/containers/map-view-modal';
import { getMapsThunk } from '@/modules/map/containers/map-list/slice';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { MetaTags } from '@/ui/MetaTags/MetaTags';

export default function Maps() {
    const dispatch = useAppDispatch();
    const {mapId} = useMapView()

    useEffect(() => {
        dispatch(getMapsThunk({ page: 0, size: 100 }))
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <MapPageContainer>
            <MetaTags title={'Maps'}/>
            <MapsList/>
            <Display condition={mapId}>
                <Suspense fallback={null}>
                    <AsyncMapViewModal />
                </Suspense>
            </Display>
        </MapPageContainer>
    );
}