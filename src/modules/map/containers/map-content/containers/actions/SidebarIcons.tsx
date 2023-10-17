import React from 'react';
import { StyledBox } from '@/ui/Box';
import { OutIcon } from '@/svg/OutIcon';
import { TrashIcon } from '@/svg/TrashIcon';
import { useMap } from '@/modules/map/common';
import { useAppTheme } from '@/hooks/useAppTheme';
import { AddImageIcon } from '@/svg/AddImageIcon';
import { FavoriteIcon } from '@/svg/FavoriteIcon';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { SvgIconPropsType } from '@/svg/common/types';
import { StyledContentSidebarBodyIcon } from '@/modules/map/styles/styled';
import { useCompletedMap } from '../completed-images/hooks/useCompletedMap';

type MapContentSidebarIconsPropsType = {
    mapId: Map['id']
}
export const SidebarIcons = ({mapId}: MapContentSidebarIconsPropsType) => {
    const theme = useAppTheme();

    const {
        onAddMapFavorite,
        onMapShare,
        onMapDelete
    } = useMap(mapId)

    const {
        onCompletedMapModalOpen
    } = useCompletedMap()

    const iconsProps: SvgIconPropsType = {
        size: 30,
        color: theme.colors.primary
    }

    return (
        <StyledBox
            width={'100%'}
            padding={'10px 0 10px 0'}
            borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}
        >
            <StyledContentSidebarBodyIcon
                onClick={onCompletedMapModalOpen}
            >
                <AddImageIcon{...iconsProps}/>
            </StyledContentSidebarBodyIcon>
            <StyledContentSidebarBodyIcon
                onClick={onAddMapFavorite}
            >
                <FavoriteIcon {...iconsProps} />
            </StyledContentSidebarBodyIcon>
            <StyledContentSidebarBodyIcon
                onClick={onMapShare}
            >
                <OutIcon {...iconsProps} />
            </StyledContentSidebarBodyIcon>
            <StyledContentSidebarBodyIcon
                onClick={onMapDelete}
            >
                <TrashIcon {...iconsProps} />
            </StyledContentSidebarBodyIcon>
        </StyledBox>
    );
};