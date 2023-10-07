import React from 'react';
import { MapContentFooter } from '@/modules/map/MapContent/MapContentFooter';
import { MapContentPreview } from './MapContentPreview';
import { MapContentHeader } from './MapContentHeader';
import { Comment, Map, User } from '@/api/codegen/genMouseMapsApi';
import { StyledMapContentMain, } from '@/modules/map/styled';
import { mapsData } from '@/moc/mapsMoc';
import { MiniMapImages } from './MiniMapImages';

type MapContentMainPropsType = {
    messages: Comment[],
    user?: User,
    map: Map
}
export const MapContentMain = (props: MapContentMainPropsType) => {

    const completedMaps = mapsData;

    return (
        <StyledMapContentMain>
            <MapContentHeader
                completeCount={completedMaps.length}
                viewCount={completedMaps.length}
                commentsCount={completedMaps.length}
                map={props.map}
            />
            <MapContentPreview image={props.map.image}/>
            <MiniMapImages maps={completedMaps}/>
            <MapContentFooter tags={props.map.tags}/>
        </StyledMapContentMain>
    );
};
