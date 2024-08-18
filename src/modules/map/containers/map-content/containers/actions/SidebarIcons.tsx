import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuth } from '@/modules/auth/slice';
import { Display } from '@/ui/Display';
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
import { StyledContentSidebarBodyCount, StyledContentSidebarBodyIcon } from '@/modules/map/styles/styled';
import { useCompletedMap } from '../completed-images/hooks/useCompletedMap';

type MapContentSidebarIconsPropsType = {
    levelId: Map['id'];
    isCompleted?: boolean;
    isFavorite?: boolean;
    favoritesCount?: number;
}
export const SidebarIcons = ({levelId, isFavorite, isCompleted, favoritesCount}: MapContentSidebarIconsPropsType) => {
    const { theme } = useAppTheme();
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
        color: theme.colors.textOnSecondary
    }

    const onToggleMapFavoriteHandler = () => {
        onToggleMapFavorite(Boolean(isFavorite))
    }

    return (
        <StyledBox
            width={'100%'}
            padding={'10px 0 10px 0'}
            borderBottom={`1px solid ${theme.colors.neutral}`}
        >
            <StyledContentSidebarBodyIcon
                disabled={!isAuth}
                onClick={onCompletedMapModalOpen}
            >
                <AddImageIcon {...iconsProps} color={isCompleted ? theme.colors.brandColor : iconsProps.color}/>
            </StyledContentSidebarBodyIcon>
            <StyledContentSidebarBodyIcon
                disabled={!isAuth}
                onClick={onToggleMapFavoriteHandler}
            >
                <FavoriteIcon {...iconsProps} color={isFavorite ? theme.colors.brandColor : iconsProps.color} />
                <Display condition={favoritesCount}>
                    <StyledContentSidebarBodyCount>
                        {favoritesCount}
                    </StyledContentSidebarBodyCount>
                </Display>
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
