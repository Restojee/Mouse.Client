import * as React from 'react';
import { getAppVersion } from '@/common/utils';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuth } from '@/modules/auth/slice';
import { getTagsThunk } from '@/modules/tag';
import { CreateTagPopup } from '@/modules/tag/containers/create-tag-popup/CreateTagPopup';
import { useTag } from '@/modules/tag/hooks/useTag';
import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display';
import { useEffect } from 'react';
import { StyledSidebar } from '@/layout/sidebar/styles/StyledSidebar';
import { StyledSidebarLogo } from '@/layout/sidebar/styles/StyledSidebarLogo';
import { SidebarSwitcher } from '@/layout/sidebar/SidebarSwitcher';
import { TagsNavigation } from '@/modules/tag/TagsNavigation';
import { MapsByFiltersNavigation } from '@/modules/map/containers/map-navigation/ui/MapsByFiltersNavigation';
import { MapsByCategoryNavigation } from '@/modules/map/containers/map-navigation/ui/MapsByCategoryNavigation';

const appVersion = getAppVersion()

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = React.useState(false);

    const isAuth = useAppSelector(selectIsAuth);
    const {
        modalType,
        onCloseModal
    } = useTag()

    useEffect(() => {
        dispatch(getTagsThunk());
        setTimeout(() => {
            setIsOpen(window.innerWidth > 900)
        }, 200)
    }, []);

    return (
        <StyledSidebar isOpen={isOpen}>
            <StyledBox direction={'column'} gap={isOpen ? 20 : 10}>
                <SidebarSwitcher
                    onClick={() => setIsOpen(!isOpen)}
                    isOpen={isOpen}
                />
                <MapsByCategoryNavigation isOpen={isOpen}/>
                <Display condition={isAuth}>
                    <MapsByFiltersNavigation isOpen={isOpen}/>
                </Display>
            </StyledBox>
            <Display condition={isOpen}>
                <StyledBox position={'relative'}>
                    <CreateTagPopup
                        isVisible={(modalType === 'create') && isAuth}
                        onClose={onCloseModal}
                    />
                </StyledBox>
            </Display>
            <StyledBox direction={'column'} overflow={'hidden'} grow={1}>
                <TagsNavigation isOpen={isOpen}/>
                <StyledSidebarLogo isOpen={isOpen}>
                    Maps
                </StyledSidebarLogo>
                <Display condition={isOpen}>
                    <StyledBox
                        opacity={0.6}
                        textAlign={'center'}
                        margin={'5px auto 0 auto'}
                    >
                        {appVersion}
                    </StyledBox>
                </Display>
            </StyledBox>
        </StyledSidebar>
    );
};