import {
    StyledContentSidebarBodyIcon,
    StyledMapContentSidebarIconsSection
} from "@/modules/map/styled";
import { panelIconsArray } from "@/pages/maps/[id]";
import React from "react";
import { useTheme } from "styled-components";
import { DefaultTheme }  from "@/layout/theme/constants";

export const MapContentSidebarIcons = () => {

    const theme = useTheme() as typeof DefaultTheme

    return (
        <StyledMapContentSidebarIconsSection gap="0">
            { panelIconsArray.map(({ icon }, index) => (
                <StyledContentSidebarBodyIcon key={ index }>
                    { icon(theme) }
                </StyledContentSidebarBodyIcon>
            )) }
        </StyledMapContentSidebarIconsSection>
    )
}