import { formatDateTime } from '@/common/utils/formatDateTime';
import { Display } from '@/ui/Display';
import React, { useState } from 'react';
import { Tip } from '@/api/codegen/genMouseMapsApi';
import { StyledInfoBlock, StyledInfoTitle } from '@/layout/drawer/Info/styled';
import { CloseIcon } from '@/svg/CloseIcon';
import { StyledBox } from '@/ui/Box';
import { StyledButtonIcon } from '@/ui/Button/styles/StyledButtonIcon';
import { Typography } from '@/ui/Typography';

type InfoItemPropsType = {
    info: Tip;
    removeInfo: (id: Tip['id']) => void;
    selectInfo: (info: Tip) => void;
}
export const InfoItem = (props: InfoItemPropsType) => {
    const {
        info,
        removeInfo,
        selectInfo,
    } = props;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <StyledBox
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            gap="5px"
            direction="column"
        >
            <StyledBox align="center">
                <StyledInfoTitle onClick={() => selectInfo(info)}>
                    {info.title}
                </StyledInfoTitle>
                <StyledButtonIcon
                    opacity={isHovered ? '1' : '0'}
                    onClick={() => removeInfo(info.id)}
                    margin="0 0 0 auto"
                >
                    <CloseIcon color="gray"/>
                </StyledButtonIcon>
            </StyledBox>
            <StyledInfoBlock>
                <Typography>{info.text}</Typography>
            </StyledInfoBlock>
            <StyledBox
                margin={'0 15px 0 auto'}
                gap={5}
                justify={'space-between'}
                fontSize={'0.8rem'}
                opacity={isHovered ? '0.5' : '0'}
            >
                <Typography>
                    {info.user?.username},
                </Typography>
                <Typography>
                    {formatDateTime(info.createdUtcDate)}
                </Typography>
            </StyledBox>

        </StyledBox>
    );
};

