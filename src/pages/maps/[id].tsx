import React from 'react';
import { MapContent } from '@/modules/map/containers/map-content';
import { getMapByIdThunk, getMapsThunk } from '@/modules/map/containers/map-list/slice';
import { wrapper } from '@/store';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { MetaTags } from '@/ui/MetaTags/MetaTags';
import { StyledModalWrapper } from '@/ui/Modal/styled';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';

export const getServerSideProps = wrapper.getServerSideProps(store => async (initialAppProps) => {
    const { query } = initialAppProps;
    const { getState, dispatch } = store;
    const mapId = Number(query.id);

    await dispatch(getMapsThunk({ size: 20, page: 0 }));
    await dispatch(getMapByIdThunk({ mapId }));

    const { mapsList, mapContent } = getState().maps;
    const { commentsList } = getState().comments;
    const props = {
        maps: mapsList,
        map: mapContent,
        comments: commentsList
    };

    return { props };
});

type MapPropsType = {
    map: Map;
    maps: Map[];
}

const Map = (props: MapPropsType) => {

    return (
        <MapPageContainer>
            <MetaTags title={props.map?.name}/>
            <StyledModalWrapper>
                <MapContent map={props.map}/>
            </StyledModalWrapper>
            <MapsList />
        </MapPageContainer>
    );
};

export default Map;