import { MapContent } from '@/modules/map/containers/map-content';
import React from "react";
import { wrapper} from "@/store";
import { MAP_COMMENT_COLLECTION, mapsData } from '@/moc/mapsMoc';
import { MapPageContainer } from "@/modules/map/components/MapContainer";
import { MetaTags } from '@/ui/MetaTags/MetaTags';
import { StyledModalWrapper } from "@/ui/Modal/styled";
import { useRouter } from "next/router";
import { Comment, Map } from '@/api/codegen/genMouseMapsApi';
import { MapsList } from "@/modules/map/containers/map-list/ui/MapsList";

export const getServerSideProps = wrapper.getServerSideProps(store => async (initialAppProps) => {
    const { query } = initialAppProps;
    const mapId = Number(query.id)
    // const { data: maps } = await store.dispatch(mapsApi.endpoints.getMaps.initiate({ page: 0, size: 20 }));
    // const { data: map } = await store.dispatch(mapsApi.endpoints.getMap.initiate({ mapId }));
    const props = { maps: mapsData, map: mapsData[0], messages: MAP_COMMENT_COLLECTION};
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
            <MetaTags title={props.map.name}/>
            <StyledModalWrapper>
                <MapContent map={props.map}/>
            </StyledModalWrapper>
            <MapsList maps={ props.maps } />
        </MapPageContainer>
    )
}

export default Map;