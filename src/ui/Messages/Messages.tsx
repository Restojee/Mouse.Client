import { Comment } from '@/api/codegen/genMouseMapsApi';
import React from 'react';
import { StyledBox } from '@/ui/Box/styles/StyledBox';
import { Typography } from '@/ui/Typography/styles/Typography';
import { IconButton } from '@/ui/Button/IconButton';
import { CloseIcon } from '@/svg/CloseIcon';
import {
    StyledMessageAvatar,
    StyledMessageBody,
    StyledMessageFooter,
    StyledMessageStyled,
    StyledMessageText,
} from '@/ui/Messages/styled';

type PropsType = {
    comment: Comment,
}
export const Message = (props: PropsType) => {
    const {
        comment,
    } = props;
    return (
        <StyledMessageStyled>
            <StyledMessageAvatar src={comment.user?.avatar}/>
            <StyledMessageBody>
                <StyledBox justify="space-between" align="center">
                    <Typography isEllipsis addSize="0" isLink fontWeight="bold">
                        {comment.user?.username}
                    </Typography>
                    <StyledBox opacity="0.4" align="center">
                        <Typography addSize="-2px">{'01.01.2000'}</Typography>
                        <IconButton isAdmin>
                            <CloseIcon size="20px" color="#000"/>
                        </IconButton>
                    </StyledBox>
                </StyledBox>
                <StyledMessageText>{comment.text}</StyledMessageText>
                <StyledMessageFooter isLink margin="0 0 0 auto">
                    Ответить
                </StyledMessageFooter>
            </StyledMessageBody>
        </StyledMessageStyled>
    );
};
