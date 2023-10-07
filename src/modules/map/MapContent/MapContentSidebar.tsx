import React from "react";
import { StyledMapContentSidebar } from "@/modules/map/styled";
import { MapContentSidebarProfile } from "@/modules/map/MapContent/MapContentSidebarProfile";
import { MapContentSidebarIcons } from "@/modules/map/MapContent/MapContentSidebarIcons";
import { MapContentSidebarComments } from "@/modules/map/MapContent/MapContentSidebarCommentSection";

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