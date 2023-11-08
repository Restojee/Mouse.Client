import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuth } from '@/modules/auth/slice';
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
    levelId: Map['id'];
    isCompleted?: boolean;
    isFavorite?: boolean;
}
export const SidebarIcons = ({levelId, isFavorite, isCompleted}: MapContentSidebarIconsPropsType) => {
    const theme = useAppTheme();
    const isAuth = useAppSelector(selectIsAuth);

    const {
        onToggleMapFavorite,
        onMapShare,
        onMapDelete
    } = useMap(levelId)

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
                disabled={!isAuth}
                onClick={onCompletedMapModalOpen}
            >
                <AddImageIcon{...iconsProps}/>
            </StyledContentSidebarBodyIcon>
            <StyledContentSidebarBodyIcon
                disabled={!isAuth}
                onClick={onToggleMapFavorite}
            >
                <FavoriteIcon {...iconsProps} color={isFavorite ? theme.colors.brandColor : iconsProps.color}  />
            </StyledContentSidebarBodyIcon>
            <StyledContentSidebarBodyIcon
                onClick={onMapShare}
            >
                <OutIcon {...iconsProps} />
            </StyledContentSidebarBodyIcon>
            <StyledContentSidebarBodyIcon
                disabled={!isAuth}
                onClick={onMapDelete}
            >
                <TrashIcon {...iconsProps} />
            </StyledContentSidebarBodyIcon>
        </StyledBox>
    );
};