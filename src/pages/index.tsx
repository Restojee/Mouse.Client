import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUsersThunk } from '@/modules/user/slice';
import React, { Suspense, useEffect } from 'react';
import { MapsQueryParams } from '@/modules/map/containers/map-list/containers/maps-query-params/MapsQueryParams';
import { TagsModal } from '@/modules/tag/containers/tags-modal/TagsModal';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { Display } from '@/ui/Display';
import { AsyncMapViewModal } from '@/modules/map/containers/map-view-modal';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { MetaTags } from '@/ui/MetaTags/MetaTags';

export default function Maps() {
    const { mapId } = useMapView();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsersThunk());
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <MapPageContainer>
            <MetaTags title={'Maps'}/>
            <MapsQueryParams/>
            <MapsList/>
            <Display condition={mapId}>
                <Suspense fallback={null}>
                    <AsyncMapViewModal/>
                </Suspense>
            </Display>
            <TagsModal/>
        </MapPageContainer>
    );
}