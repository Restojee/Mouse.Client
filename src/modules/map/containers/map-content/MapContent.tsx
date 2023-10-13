import { getMapImageLink } from '@/common/utils';
import { useAppTheme } from '@/hooks/useAppTheme';
import React from 'react';
import { Comment, Map } from '@/api/codegen/genMouseMapsApi';
import { mapsData } from '@/moc/mapsMoc';
import { SidebarIcons } from './containers/actions/SidebarIcons';
import { SidebarComments } from './containers/comments/SidebarComments';
import { MiniMapImages } from './containers/completed-images/MiniMapImages';
import { Header } from './containers/header/Header';
import { Preview } from './containers/image/Preview';
import { Note } from './containers/note/Note';
import { Tags } from './containers/tags/Tags';
import { SidebarProfile } from './components/sidebar-profile/SidebarProfile';
import { StyledMapContentMain, StyledMapContentSidebar } from '../../styles/styled';
import { Paper } from '@/ui/Paper';

type MapContentPropsType = {
    map: Map;
}
export const MapContent = ({ map }: MapContentPropsType) => {
    const theme = useAppTheme();
    const completedMaps = mapsData;

    return (
        <Paper
            align={'flex-start'}
            padding={0}
            bgColor={theme.colors.primary}
            direction={'row'}
            maxWidth={1200}
        >
            <StyledMapContentMain>
                <Header
                    completeCount={completedMaps.length}
                    viewCount={completedMaps.length}
                    commentsCount={completedMaps.length}
                    map={map}
                />
                <Preview image={getMapImageLink(map?.image)}/>
                <MiniMapImages maps={completedMaps}/>
                <Tags tags={map?.tags}/>
                <Note/>
            </StyledMapContentMain>
            <StyledMapContentSidebar>
                <SidebarProfile
                    user={map?.user}
                    date={'01.01.2000'}
                />
                <SidebarIcons mapId={map?.id}/>
                <SidebarComments mapId={map?.id}/>
            </StyledMapContentSidebar>
        </Paper>
    );
};

