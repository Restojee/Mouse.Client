import { Avatar } from "@/layout/avatar/Avatar";
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { Typography } from "@/ui/Typography/styles/Typography";
import { StyledMapContentSidebarProfile } from "@/modules/map/styled";
import React from "react";

type Props = {
    username: string
}
export const MapContentSidebarProfile = (props: Partial<Props>) => {
    return (
        <StyledMapContentSidebarProfile>
            <Avatar
                border
                size="70px"
                image="http://tfm-maps.ru:9000/auth/P11sXfz.png"
            />
            <StyledBox direction="column">
                <Typography
                    isLink
                    isEllipsis
                    addSize="4px"
                    fontWeight="bold"
                >
                    { props?.username }
                </Typography>
                <Typography>12 февраля</Typography>
            </StyledBox>
        </StyledMapContentSidebarProfile>
    )
}