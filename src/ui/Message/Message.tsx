import { getAvatarImageLink } from '@/common/utils';
import { formatDateTime } from '@/common/utils/formatDateTime';
import { Avatar } from '@/ui/Avatar';
import { Display } from '@/ui/Display';
import { Property } from 'csstype';
import React, { useMemo } from 'react';
import { Comment } from '@/api/codegen/genMouseMapsApi';
import { useAppTheme } from '@/hooks/useAppTheme';
import { StyledBox } from '@/ui/Box';
import { Typography } from '@/ui/Typography/styles/Typography';
import { IconButton } from '@/ui/Button/IconButton';
import { CloseIcon } from '@/svg/CloseIcon';
import {
    StyledMessageText,
} from './styled';

type PropsType = {
    comment: Comment,
    onDelete?: (id: number) => void
    onUsernameClick?: (id: number) => void
    padding?: Property.Padding;
}
export const Message = (props: PropsType) => {
    const {
        comment,
        onDelete,
        padding,
        onUsernameClick,
    } = props;

    const theme = useAppTheme();

    const onDeleteHandler = () => {
        if(comment.id && onDelete) {
            onDelete(comment.id)
        }
    }

    const onAuthorClickHandler = () => {
        if(comment.user?.id && onUsernameClick) {
            onUsernameClick(comment.user?.id)
        }
    }

    const dateTime = useMemo(() => {
        return formatDateTime(comment.createdUtcDate)
    }, [comment])

    const time = useMemo(() => {
        return formatDateTime(comment.createdUtcDate, false, true)
    }, [comment])

    return (
        <StyledBox
            maxWidth={'100%'}
            bgColor={theme.colors.secondary}
            borderRadius={'15px'}
            padding={padding || '0 10px'}
            gap={15}
        >
            <Avatar
                image={getAvatarImageLink(comment.user?.avatar)}
                username={comment.user?.username}
            />
            <StyledBox
                direction={'column'}
                grow={1}
                gap={5}
                overflow={'hidden'}
            >
                <StyledBox align="center" gap={5}>
                    <Typography
                        margin={'0 auto 0 0'}
                        isEllipsis
                        onClick={onAuthorClickHandler}
                        isLink
                    >
                        {comment.user?.username}
                    </Typography>
                    <Typography title={time} fontSize={'0.7rem'}>
                        {dateTime}
                    </Typography>
                    <Display condition={!!onDelete}>
                        <IconButton onClick={onDeleteHandler} isAdmin>
                            <CloseIcon size="20px" color="#000"/>
                        </IconButton>
                    </Display>
                </StyledBox>
                <StyledMessageText>
                    {comment.text}
                </StyledMessageText>
            </StyledBox>
        </StyledBox>
    );
};
