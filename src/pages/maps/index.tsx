import { Map } from '@/api/codegen/genMouseMapsApi';
import { getMapsThunk } from '@/modules/map/containers/map-list/slice';
import React from 'react';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { wrapper } from '@/store';
import { MetaTags } from '@/ui/MetaTags/MetaTags';

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
    const { dispatch, getState } = store;
    await dispatch(getMapsThunk({ page: 0, size: 20 }));
    const state = getState();

    return {
        props: {
            maps: state.maps.mapsList,
        },
    };
});

type MapsPropsType = {
    maps: Map[];
}
export default function Maps(props: MapsPropsType) {

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <MapPageContainer>
            <MetaTags title={'Maps'}/>
            <MapsList maps={props.maps}/>
        </MapPageContainer>
    );
}