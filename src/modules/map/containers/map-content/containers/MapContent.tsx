import React from 'react';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { mapsData } from '@/moc/mapsMoc';
import { SidebarIcons } from '@/modules/map/containers/map-content/containers/actions/SidebarIcons';
import { SidebarComments } from '@/modules/map/containers/map-content/containers/comments/SidebarComments';
import { MiniMapImages } from '@/modules/map/containers/map-content/containers/completed-images/MiniMapImages';
import { Header } from '@/modules/map/containers/map-content/containers/header/Header';
import { Preview } from '@/modules/map/containers/map-content/containers/image/Preview';
import { Note } from '@/modules/map/containers/map-content/containers/note/Note';
import { Tags } from '@/modules/map/containers/map-content/containers/tags/Tags';
import { SidebarProfile } from '@/modules/map/containers/map-content/components/sidebar-profile/SidebarProfile';
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
                <Header
                    completeCount={completedMaps.length}
                    viewCount={completedMaps.length}
                    commentsCount={completedMaps.length}
                    map={map}
                />
                <Preview image={map.image}/>
                <MiniMapImages maps={completedMaps}/>
                <Tags tags={map.tags}/>
                <Note/>
            </StyledMapContentMain>
            <StyledMapContentSidebar>
                <SidebarProfile
                    user={map.user}
                    date={'01.01.2000'}
                />
                <SidebarIcons mapId={map.id}/>
                <SidebarComments mapId={map.id}/>
            </StyledMapContentSidebar>
        </Paper>
    );
};

