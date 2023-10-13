import React from 'react';
import { getMapsThunk } from '@/modules/map/containers/map-list/slice';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { wrapper } from '@/store';
import { MetaTags } from '@/ui/MetaTags/MetaTags';

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    await store.dispatch(getMapsThunk({ page: 0, size: 40 }));

    return {
        props: {},
    };
});

export default function Maps() {

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <MapPageContainer>
            <MetaTags title={'Maps'}/>
            <MapsList/>
        </MapPageContainer>
    );
}