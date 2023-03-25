import { wrapper} from "@/store";
import { mapsApi } from "@/api/mapsApi";
import { MapPageContainer } from "@/modules/map/MapContainer";
import { StyledModalWrapper } from "@/ui/Modal/styled";
import { StyledMapContent } from "@/modules/map/styled";
import { useRouter } from "next/router";
import { Map } from "@/api/codegen/genMouseMapsApi";
import { MapsContent } from "@/modules/map/MapsContent";
import React from "react";
import { DefaultTheme } from "@/layout/theme/constants";
import { AddImageIcon } from "@/svg/AddImageIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { OutIcon } from "@/svg/OutIcon";
import { TrashIcon } from "@/svg/TrashIcon";
import { MapContentSidebar } from "@/modules/map/MapContentSidebar";
import { MapContentMain } from "@/modules/map/MapContentMain";

export const panelIconsArray = [
    { icon: (theme: typeof DefaultTheme) => <AddImageIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <FavoriteIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <OutIcon size="30px" color={ theme.colors.primary } />, },
    { icon: (theme: typeof DefaultTheme) => <TrashIcon size="30px" color={ theme.colors.primary } />, },
];

export const getServerSideProps = wrapper.getServerSideProps(store => async (initialAppProps) => {
    const { query } = initialAppProps;
    const { data: maps } = await store.dispatch(mapsApi.endpoints.getMaps.initiate({ page: 0, size: 20 }));
    const { data: map } = await store.dispatch(mapsApi.endpoints.getMap.initiate({ mapId: 1 }));
    const props = { maps, map };
    return { props };
});

type Props = {
    map: Map;   
    maps: Map[]
}

const Map = (props: Props) => {
    const { query } = useRouter();

    return (
        <MapPageContainer>
            <StyledModalWrapper>
                <StyledMapContent>
                    <MapContentMain map={ props.map } />
                    <MapContentSidebar />
                </StyledMapContent>
            </StyledModalWrapper>
            <MapsContent maps={ props.maps } />
        </MapPageContainer>
    )
}

export default Map ;