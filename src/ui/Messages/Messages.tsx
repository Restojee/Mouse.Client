import React from 'react';
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { Typography } from "@/ui/Typography/styles/Typography";
import { IconButton } from "@/ui/Button/IconButton";
import { CloseIcon } from "@/svg/CloseIcon";
import {
    StyledMessageAvatar,
    StyledMessageBody,
    StyledMessageFooter,
    StyledMessageStyled,
    StyledMessageText
} from "@/ui/Messages/styled";

type PropsType = {
    name: string,
    date: string,
    avatar: string,
    text: string
}
export const Message = (props: PropsType) => (
    <StyledMessageStyled>
        <StyledMessageAvatar src={ props.avatar } />
        <StyledMessageBody>
            <StyledBox justify="space-between" align="center">
                <Typography isEllipsis addSize="0" isLink fontWeight="bold">
                    { props.name }
                </Typography>
                <StyledBox opacity="0.4" align="center">
                    <Typography addSize="-2px">{ props.date }</Typography>
                    <IconButton isAdmin>
                        <CloseIcon size="20px" color="#000" />
                    </IconButton>
                </StyledBox>
            </StyledBox>
            <StyledMessageText>{ props.text }</StyledMessageText>
            <StyledMessageFooter isLink margin="0 0 0 auto">
                Ответить
            </StyledMessageFooter>
        </StyledMessageBody>
    </StyledMessageStyled>
);
