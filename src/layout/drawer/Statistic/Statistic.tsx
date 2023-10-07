import { Avatar } from '@/ui/Avatar';
import React from 'react';
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography/styles/Typography";
import { CommentFillIcon } from "@/svg/CommentFillIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { InIcon } from "@/svg/InIcon";
import { BookCheckFillIcon } from "@/svg/BookCheckFillIcon";
import { StyledStatisticIconContainer, StyledStatisticIconText } from "@/layout/drawer/Statistic/styled";
import { drawerStatisticMoc } from "@/moc/drawerStatisticMoc";
import { StyledDrawerBlock, StyledDrawerHeader } from "@/layout/drawer/styled";
import { SearchForm } from "@/ui/SearchForm/SearchForm";

export const Statistic = () => {
    return (
        <StyledBox direction="column" padding="0 20px 20px 20px">
            <StyledDrawerHeader>
                Статистика
            </StyledDrawerHeader>
            <SearchForm placeholder="Поиск по нику..." />
            { drawerStatisticMoc.map((user) => (
                <StyledDrawerBlock key={ user.name + user.nameId }>
                    <StyledBox align="center">
                        <Avatar size={80} image={ user.avatar } />
                        <StyledBox gap="5px" direction="column">
                            <StyledBox gap="4px" align="center">
                                <Typography>{ user.name }</Typography>
                                <Typography opacity="0.4">{ user.nameId }</Typography>
                            </StyledBox>
                            <StyledBox>
                                <Typography opacity="0.5">
                                    Регистрация: { user.date }
                                </Typography>
                            </StyledBox>
                        </StyledBox>
                    </StyledBox>
                    <StyledBox align="center">
                        <StyledBox grow="1" justify="center" title="Выполнено">
                            <StyledStatisticIconContainer
                                fillingPercent={ user.completionCounter }
                            >
                                <BookCheckFillIcon />
                                <StyledStatisticIconText>
                                    { user.completionCounter }
                                </StyledStatisticIconText>
                            </StyledStatisticIconContainer>
                        </StyledBox>
                        <StyledBox grow="1" justify="center" title="Добавлено">
                            <StyledStatisticIconContainer fillingPercent={ user.additionCounter }>
                                <InIcon />
                                <StyledStatisticIconText>{ user.additionCounter }</StyledStatisticIconText>
                            </StyledStatisticIconContainer>
                        </StyledBox>
                        <StyledBox grow="1" justify="center" title="В избранном">
                            <StyledStatisticIconContainer>
                                <FavoriteIcon />
                                <StyledStatisticIconText>{ user.favoritesCounter }</StyledStatisticIconText>
                            </StyledStatisticIconContainer>
                        </StyledBox>
                        <StyledBox grow="1" justify="center" title="Оставлено комментариев">
                            <StyledStatisticIconContainer>
                                <CommentFillIcon />
                                <StyledStatisticIconText>{ user.commentCounter }</StyledStatisticIconText>
                            </StyledStatisticIconContainer>
                        </StyledBox>
                    </StyledBox>
                </StyledDrawerBlock>
            )) }
        </StyledBox>
    );
}
