import React from "react";
import { User } from '@/api/codegen/genMouseMapsApi';
import { StyledMapContentSidebar } from "../styled";
import { MapContentSidebarProfile } from "./MapContentSidebarProfile";
import { MapContentSidebarIcons } from "./MapContentSidebarIcons";
import { MapContentSidebarComments } from "./MapContentSidebarComments";

type MapContentSidebarPropsType = {
    mapId?: number;
    user?: User
    date: string
}
export const MapContentSidebar = ({user, date}: MapContentSidebarPropsType) => {

    return (
        <StyledMapContentSidebar>
            <MapContentSidebarProfile
                user={user}
                date={date}
            />
            <MapContentSidebarIcons />
            <MapContentSidebarComments />
        </StyledMapContentSidebar>
    )
}