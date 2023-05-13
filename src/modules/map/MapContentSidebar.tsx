import React from "react";
import { StyledMapContentSidebar } from "@/modules/map/styled";
import { MapContentSidebarProfile } from "@/modules/map/MapContentSidebarProfile";
import { MapContentSidebarIcons } from "@/modules/map/MapContentSidebarIcons";
import { MapContentSidebarComments } from "@/modules/map/MapContentSidebarCommentSection";

type Props = {
    mapId: number;
}
export const MapContentSidebar = (props: Partial<Props>) => {
    return (
        <StyledMapContentSidebar>
            <MapContentSidebarProfile />
            <MapContentSidebarIcons />
            <MapContentSidebarComments />
        </StyledMapContentSidebar>
    )
}