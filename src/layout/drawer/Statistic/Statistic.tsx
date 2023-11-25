import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUsersThunk } from '@/modules/user/slice';
import { getAvatarImageLink } from '@/common/utils';
import { formatDateTime } from '@/common/utils/formatDateTime';
import useQueryParams from '@/hooks/useQueryParams';
import { useUser } from '@/modules/user/hooks/useUser';
import { Avatar } from '@/ui/Avatar';
import { StyledBox } from '@/ui/Box';
import { Typography } from '@/ui/Typography/styles/Typography';
import { CommentFillIcon } from '@/svg/CommentFillIcon';
import { FavoriteIcon } from '@/svg/FavoriteIcon';
import { InIcon } from '@/svg/InIcon';
import { BookCheckFillIcon } from '@/svg/BookCheckFillIcon';
import { StyledStatisticIconContainer, StyledStatisticIconText } from '@/layout/drawer/Statistic/styled';
import { StyledDrawerBlock, StyledDrawerHeader } from '@/layout/drawer/styled';

export const Statistic = () => {
    const dispatch = useAppDispatch();

    const {
        users,
        getMapsPercent,
    } = useUser();

    const {
        changeFilterNavigate,
    } = useQueryParams();

    useEffect(() => {
        dispatch(getUsersThunk());
    }, []);

    return (
        <StyledBox
            direction="column"
            padding="0 0 0 20px"
            overflow={'hidden'}
        >
            <StyledDrawerHeader>
                Статистика
            </StyledDrawerHeader>
            {/*<SearchForm placeholder="Поиск по нику..."/>*/}
            <StyledBox
                direction={'column'}
                gap={20}
                padding={'0 20px 20px 0'}
                overflow={'auto'}
            >
                {users?.map((user) => (
                    <StyledDrawerBlock key={user.id}>
                        <StyledBox
                            align="center"
                            gap={20}
                            overflow={'hidden'}
                        >
                            <Avatar
                                size={60}
                                image={getAvatarImageLink(user.avatar)}
                                username={user.username}
                            />
                            <StyledBox
                                gap="5px"
                                direction="column"
                                overflow={'hidden'}
                            >
                                <StyledBox gap="4px" align="center">
                                    <Typography>{user.username}</Typography>
                                </StyledBox>
                                <StyledBox overflow={'hidden'}>
                                    <Typography opacity="0.5" title={formatDateTime(user.createdUtcDate)} isEllipsis>
                                        Регистрация: {formatDateTime(user.createdUtcDate, true)}
                                    </Typography>
                                </StyledBox>
                            </StyledBox>
                        </StyledBox>
                        <StyledBox align="center">
                            <StyledBox
                                grow="1"
                                justify="center"
                                title="Выполнено"
                                onClick={() => changeFilterNavigate({ isCompleted: true, userId: user.id })}
                            >
                                <StyledStatisticIconContainer
                                    fillingPercent={`${getMapsPercent(user.completedCount)}%`}
                                >
                                    <BookCheckFillIcon/>
                                    <StyledStatisticIconText>
                                        {user.completedCount}
                                    </StyledStatisticIconText>
                                </StyledStatisticIconContainer>
                            </StyledBox>
                            <StyledBox
                                onClick={() => changeFilterNavigate({ isCreatedByUser: true, userId: user.id })}
                                grow="1"
                                justify="center"
                                title="Добавлено"
                            >
                                <StyledStatisticIconContainer fillingPercent={`${getMapsPercent(user.levelsCount)}%`}>
                                    <InIcon/>
                                    <StyledStatisticIconText>
                                        {user.levelsCount}
                                    </StyledStatisticIconText>
                                </StyledStatisticIconContainer>
                            </StyledBox>
                            <StyledBox
                                onClick={() => changeFilterNavigate({ isFavorite: true, userId: user.id })}
                                grow="1"
                                justify="center"
                                title="В избранном"
                            >
                                <StyledStatisticIconContainer>
                                    <FavoriteIcon/>
                                    <StyledStatisticIconText>{user.favoritesCount}</StyledStatisticIconText>
                                </StyledStatisticIconContainer>
                            </StyledBox>
                            <StyledBox
                                onClick={() => alert('просмотр прокомментированных карт пока не работает')}
                                grow="1"
                                justify="center"
                                title="Оставлено комментариев"
                            >
                                <StyledStatisticIconContainer>
                                    <CommentFillIcon/>
                                    <StyledStatisticIconText>{user.commentsCount}</StyledStatisticIconText>
                                </StyledStatisticIconContainer>
                            </StyledBox>
                        </StyledBox>
                    </StyledDrawerBlock>
                ))}
            </StyledBox>
        </StyledBox>
    );
};
