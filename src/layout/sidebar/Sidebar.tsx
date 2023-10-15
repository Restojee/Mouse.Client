import * as React from 'react';
import { StyledSidebar} from "@/layout/sidebar/styles/StyledSidebar";
import { StyledSidebarLogo } from "@/layout/sidebar/styles/StyledSidebarLogo";
import { SidebarSwitcher } from "@/layout/sidebar/SidebarSwitcher";
import { TagsNavigation } from "@/modules/tag/TagsNavigation";
import { MapsByFiltersNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByFiltersNavigation";
import { MapsByCategoryNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByCategoryNavigation";

export const Sidebar = () => {
    const [ isOpen, setIsOpen ] = React.useState(false);

    return (
        <StyledSidebar isOpen={ isOpen }>
            <SidebarSwitcher
                onClick={ () => setIsOpen(!isOpen) }
                isOpen={ isOpen }
            />
            <MapsByCategoryNavigation isOpen={ isOpen } />
            <MapsByFiltersNavigation isOpen={ isOpen } />
            <TagsNavigation isOpen={ isOpen } />
            <StyledSidebarLogo isOpen={ isOpen }>
                Maps
            </StyledSidebarLogo>
        </StyledSidebar>
    )
}