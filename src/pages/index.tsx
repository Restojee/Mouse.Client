import { AsyncModals } from '@/modules/modals/AsyncModals';
import React, { Suspense, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { LoginModal } from '@/modules/auth/containers/login/LoginModal';
import { UserModal } from '@/modules/user/containers/user-modal/UserModal';
import { getUsersThunk } from '@/modules/user/slice';
import { MapsQueryParams } from '@/modules/map/containers/map-list/containers/maps-query-params/MapsQueryParams';
import { TagsModal } from '@/modules/tag/containers/tags-modal/TagsModal';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { Display } from '@/ui/Display';
import { AsyncMapViewModal } from '@/modules/map/containers/map-view-modal';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { MetaTags } from '@/ui/MetaTags/MetaTags';

export default function Maps() {
    const { levelId } = useMapView();
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
            <Display condition={levelId}>
                <Suspense fallback={null}>
                    <AsyncMapViewModal/>
                </Suspense>
            </Display>
            <AsyncModals/>
        </MapPageContainer>
    );
}