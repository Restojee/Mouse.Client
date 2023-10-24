import useQueryParams from '@/hooks/useQueryParams';
import React from 'react';
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
    const {
        users,
    } = useUser();
    const {
        updateFilter,
    } = useQueryParams();


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
                                image={user.avatar}
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
                                    <Typography opacity="0.5" isEllipsis>
                                        Регистрация: До нашей эры
                                    </Typography>
                                </StyledBox>
                            </StyledBox>
                        </StyledBox>
                        <StyledBox align="center">
                            <StyledBox
                                grow="1"
                                justify="center"
                                title="Выполнено"
                                onClick={() => updateFilter({ userId: user.id, isCompleted: true, isFavorite: undefined })}
                            >
                                <StyledStatisticIconContainer
                                    fillingPercent={'60%'}
                                >
                                    <BookCheckFillIcon/>
                                    <StyledStatisticIconText>
                                        0
                                    </StyledStatisticIconText>
                                </StyledStatisticIconContainer>
                            </StyledBox>
                            <StyledBox
                                onClick={() => alert('просмотр загруженных карт пока не работает')}
                                grow="1"
                                justify="center"
                                title="Добавлено"
                            >
                                <StyledStatisticIconContainer fillingPercent={'20%'}>
                                    <InIcon/>
                                    <StyledStatisticIconText>
                                        0
                                    </StyledStatisticIconText>
                                </StyledStatisticIconContainer>
                            </StyledBox>
                            <StyledBox
                                onClick={() => updateFilter({isFavorite: true, isCompleted: undefined, userId: user.id})}
                                grow="1"
                                justify="center"
                                title="В избранном"
                            >
                                <StyledStatisticIconContainer>
                                    <FavoriteIcon/>
                                    <StyledStatisticIconText>{1}</StyledStatisticIconText>
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
                                    <StyledStatisticIconText>{1}</StyledStatisticIconText>
                                </StyledStatisticIconContainer>
                            </StyledBox>
                        </StyledBox>
                    </StyledDrawerBlock>
                ))}
            </StyledBox>
        </StyledBox>
    );
};
