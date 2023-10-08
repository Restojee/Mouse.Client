import React from 'react';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { mapsData } from '@/moc/mapsMoc';
import { MapContentSidebarIcons } from '@/modules/map/containers/map-content/ui/actions/MapContentSidebarIcons';
import { MapContentSidebarComments } from '@/modules/map/containers/map-content/ui/comments/MapContentSidebarComments';
import { MiniMapImages } from '@/modules/map/containers/map-content/ui/completed-images/MiniMapImages';
import { MapContentHeader } from '@/modules/map/containers/map-content/ui/header/MapContentHeader';
import { MapContentPreview } from '@/modules/map/containers/map-content/ui/image/MapContentPreview';
import { MapContentNote } from '@/modules/map/containers/map-content/ui/note/MapContentNote';
import { MapContentTags } from '@/modules/map/containers/map-content/ui/tags/MapContentTags';
import { MapContentSidebarProfile } from '@/modules/map/containers/map-content/ui/user/MapContentSidebarProfile';
import { StyledMapContentMain, StyledMapContentSidebar } from '@/modules/map/styles/styled';
import Paper from '@/ui/Paper/Paper';

type MapContentPropsType = {
    map: Map;
}
export const MapContent = ({map}: MapContentPropsType) => {
    const completedMaps = mapsData;

    return (
        <Paper direction={'row'} maxWidth={1200}>
            <StyledMapContentMain>
                <MapContentHeader
                    completeCount={completedMaps.length}
                    viewCount={completedMaps.length}
                    commentsCount={completedMaps.length}
                    map={map}
                />
                <MapContentPreview image={map.image}/>
                <MiniMapImages maps={completedMaps}/>
                <MapContentTags tags={map.tags}/>
                <MapContentNote/>
            </StyledMapContentMain>
            <StyledMapContentSidebar>
                <MapContentSidebarProfile
                    user={map.user}
                    date={'01.01.2000'}
                />
                <MapContentSidebarIcons mapId={map.id}/>
                <MapContentSidebarComments mapId={map.id}/>
            </StyledMapContentSidebar>
        </Paper>
    );
};

