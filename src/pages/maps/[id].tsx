import { mapsApi } from '@/api/mapsApi';
import { MapContent } from '@/modules/map/containers/map-content';
import { getMapByIdThunk, getMapsThunk } from '@/modules/map/containers/map-list/slice';
import React from 'react';
import { wrapper } from '@/store';
import { MAP_COMMENT_COLLECTION } from '@/moc/mapsMoc';
import { MapPageContainer } from '@/modules/map/components/MapContainer';
import { MetaTags } from '@/ui/MetaTags/MetaTags';
import { StyledModalWrapper } from '@/ui/Modal/styled';
import { useRouter } from 'next/router';
import { Comment, Map } from '@/api/codegen/genMouseMapsApi';
import { MapsList } from '@/modules/map/containers/map-list/ui/MapsList';

export const getServerSideProps = wrapper.getServerSideProps(store => async (initialAppProps) => {
    const { query } = initialAppProps;
    const { getState, dispatch } = store;

    const mapId = Number(query.id);
    await dispatch(getMapsThunk({ size: 20, page: 0 }));
    await dispatch(getMapByIdThunk({ mapId }));
    const { mapsList, mapContent } = getState().maps;
    const props = { maps: mapsList, map: mapContent, messages: MAP_COMMENT_COLLECTION };
    console.log(mapContent, 'mapContent')
    return { props };
});

type Props = {
    map: Map;
    maps: Map[];
    messages: Comment[]
}

const Map = (props: Props) => {
    const { query } = useRouter();

    return (
        <MapPageContainer>
            <MetaTags title={props.map?.name}/>
            <StyledModalWrapper>
                <MapContent map={props.map}/>
            </StyledModalWrapper>
            <MapsList maps={props.maps}/>
        </MapPageContainer>
    );
};

export default Map;