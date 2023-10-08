import { User } from '@/api/codegen/genMouseMapsApi';
import { Avatar } from '@/ui/Avatar';
import { StyledBox } from '@/ui/Box';
import { Typography } from '@/ui/Typography';
import React from 'react';

type MapContentSidebarProfilePropsType = {
    user?: User,
    date: string
}
export const SidebarProfile = (props: MapContentSidebarProfilePropsType) => {
    const {
        user,
        date,
    } = props;

    return (
        <StyledBox
            direction={'column'}
            align={'center'}
            gap={20}
            margin={'0 30px 0 30px'}
        >
            <Avatar
                size={80}
                image={user?.avatar}
                username={user?.username}
            />
            <StyledBox
                direction="column"
                textAlign={'center'}
            >
                <Typography
                    fontSize={'1.1rem'}
                    isLink
                    isEllipsis
                    fontWeight="bold"
                >
                    {user?.username}
                </Typography>
                <Typography>
                    {date}
                </Typography>
            </StyledBox>
        </StyledBox>
    );
};