import { wrapper} from "@/store";
import { MAP_COMMENT_COLLECTION, mapsData } from '@/moc/mapsMoc';
import { MapPageContainer } from "@/modules/map/MapContainer";
import { MetaTags } from '@/ui/MetaTags/MetaTags';
import { StyledModalWrapper } from "@/ui/Modal/styled";
import { useRouter } from "next/router";
import { Comment, Map } from '@/api/codegen/genMouseMapsApi';
import { MapsContent } from "@/modules/map/MapsContent";
import React from "react";
import { DefaultTheme } from "@/layout/theme/constants";
import { AddImageIcon } from "@/svg/AddImageIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { OutIcon } from "@/svg/OutIcon";
import { TrashIcon } from "@/svg/TrashIcon";
import { MapContentSidebar, MapContentMain } from "@/modules/map";
import Paper from "@/ui/Paper/Paper";

export const panelIconsArray = [
    { icon: (theme: typeof DefaultTheme) => <AddImageIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <FavoriteIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <OutIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <TrashIcon size="30px" color={ theme.colors.primary } />, },
];

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
                <Paper direction={"row"} maxWidth={1200}>
                    <MapContentMain
                        map={ props.map }
                        user={props.map.user}
                        messages={props.messages}
                    />
                    <MapContentSidebar
                        user={props.map.user}
                        mapId={props.map.id}
                        date={'01.01.2000'}
                    />
                </Paper>
            </StyledModalWrapper>
            <MapsContent maps={ props.maps } />
        </MapPageContainer>
    )
}

export default Map ;