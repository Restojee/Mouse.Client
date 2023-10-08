import React from 'react';
import { mapsData } from '@/moc/mapsMoc';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { wrapper } from "@/store";
import { mapsApi, useGetMapsQuery } from "@/api/mapsApi";
import { MetaTags } from '@/ui/MetaTags/MetaTags';

export const getServerSideProps = wrapper.getStaticProps(store => async () => {
    const props = {}
    await store.dispatch(mapsApi.endpoints.getMaps.initiate({ page: 0, size: 20 }));
    return { props }
});

export default function Maps() {
    const { data: maps } = useGetMapsQuery({ page: 0, size: 20 });
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <MapPageContainer>
            <MetaTags title={'Maps'}/>
            <MapsList maps={ mapsData } />
        </MapPageContainer>
    )
}