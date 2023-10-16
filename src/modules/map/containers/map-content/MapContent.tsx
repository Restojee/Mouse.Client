import { IS_TABLET } from '@/common/constants';
import { getMapImageLink } from '@/common/utils';
import { formatDateTime } from '@/common/utils/formatDateTime';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { CloseIcon } from '@/svg/CloseIcon';
import { StyledBox } from '@/ui/Box';
import { IconButton } from '@/ui/Button/IconButton';
import { ModalCloseIcon } from '@/ui/ModalCloseIcon/ModalCloseIcon';
import React, { useMemo } from 'react';
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
    map: Map | null;
}
export const MapContent = ({ map }: MapContentPropsType) => {
    const theme = useAppTheme();
    const {closeMap} = useMapView()
    const completedMaps = mapsData;

    const fixEventPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const dateTime = useMemo(() => {
        if(map) {
            return formatDateTime(map?.createdUtcDate)
        }
        return ''
    }, [map])

    return (
        <Paper
            onClick={fixEventPropagation}
            align={'flex-start'}
            padding={0}
            bgColor={theme.colors.primary}
            direction={!IS_TABLET ?'row' : 'column'}
            maxWidth={1200}
            overflow={'auto'}
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
                <ModalCloseIcon
                    color={theme.colors.textOnSecondary}
                    onClick={closeMap}
                />
                <SidebarProfile
                    user={map?.user}
                    date={dateTime}
                />
                <SidebarIcons mapId={map?.id}/>
                <SidebarComments mapId={map?.id}/>
            </StyledMapContentSidebar>
        </Paper>
    );
};

