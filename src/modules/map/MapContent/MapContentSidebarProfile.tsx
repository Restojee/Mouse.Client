import { User } from '@/api/codegen/genMouseMapsApi';
import { Avatar } from '@/ui/Avatar';
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography/styles/Typography";
import { StyledMapContentSidebarProfile } from "@/modules/map/styled";
import React from "react";

type MapContentSidebarProfilePropsType = {
    user?: User,
    date: string
}
export const MapContentSidebarProfile = (props: MapContentSidebarProfilePropsType) => {
    const {
        user,
        date
    } = props

    return (
        <StyledMapContentSidebarProfile>
            <Avatar
                size={70}
                image={user?.avatar}
                username={user?.username}
            />
            <StyledBox direction="column">
                <Typography
                    isLink
                    isEllipsis
                    fontWeight="bold"
                >
                    { user?.username }
                </Typography>
                <Typography>{date}</Typography>
            </StyledBox>
        </StyledMapContentSidebarProfile>
    )
}