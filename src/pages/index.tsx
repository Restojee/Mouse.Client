import React, { Suspense } from 'react';
import { TagsModal } from '@/modules/tag/containers/tags-modal/TagsModal';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { Display } from '@/ui/Display';
import { AsyncMapViewModal } from '@/modules/map/containers/map-view-modal';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { MetaTags } from '@/ui/MetaTags/MetaTags';

export default function Maps() {
    const { mapId } = useMapView();

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <MapPageContainer>
            <MetaTags title={'Maps'}/>
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