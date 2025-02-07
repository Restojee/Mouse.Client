import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { StyledDrawerBlock, StyledDrawerHeader } from "@/layout/drawer/styled";
import { useUser } from "@/modules/user/hooks/useUser";
import { getUsersThunk } from "@/modules/user/slice";
import { BookCheckFillIcon } from "@/svg/BookCheckFillIcon";
import { CommentFillIcon } from "@/svg/CommentFillIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { InIcon } from "@/svg/InIcon";
import { Avatar } from "@/ui/Avatar";
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography/styles/Typography";
import React, { useCallback, useEffect } from "react";
import StarRating from "@/ui/StarRating/StarRating";
import { getStarsByUserId } from "@/modules/user/utils/getStarsByUserId";
import { User } from "@/api/codegen/genMouseMapsApi";
import { StatisticCircle } from "@/layout/drawer/Statistic/components/StatisticCircle";

export const Statistic = () => {
  const dispatch = useAppDispatch();

  const { users, currentUser } = useUser();
  const { changeFilterNavigate } = useFilterQueryParams();

  const getUserStarsCount = useCallback(
    (id: User["id"]) => {
      return getStarsByUserId(id, users);
    },
    [users],
  );

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  return (
    <StyledBox
      direction="column"
      padding="0 0 0 20px"
      overflow={"hidden"}
    >
      <StyledDrawerHeader>Статистика</StyledDrawerHeader>
      {/*<SearchForm placeholder="Поиск по нику..."/>*/}
      <StyledBox
        direction={"column"}
        gap={20}
        padding={"0 20px 20px 0"}
        overflow={"auto"}
      >
        {users?.map((user) => (
          <StyledDrawerBlock
            key={user.id}
            isMyCard={user.id === currentUser?.id}
          >
            <StyledBox
              align="center"
              gap={20}
              overflow={"hidden"}
            >
              <Avatar
                size={60}
                image={getAvatarImageLink(user.avatar)}
                username={user.username}
              />
              <StyledBox
                gap="5px"
                direction="column"
                overflow={"hidden"}
              >
                <StyledBox
                  gap="4px"
                  align="center"
                >
                  <Typography>{user.username}</Typography>
                  <StarRating count={getUserStarsCount(user.id)} />
                </StyledBox>
                <StyledBox overflow={"hidden"}>
                  <Typography
                    opacity="0.5"
                    title={formatDateTime(user.createdUtcDate)}
                    isEllipsis
                  >
                    Регистрация: {formatDateTime(user.createdUtcDate, true)}
                  </Typography>
                </StyledBox>
              </StyledBox>
            </StyledBox>
            <StyledBox align="center">
              <StatisticCircle
                title="Выполнено"
                onClick={changeFilterNavigate}
                filters={{ isCompleted: true }}
                count={user.completedCount || 0}
                userId={user.id}
                icon={<BookCheckFillIcon />}
                showPercent
              />
              <StatisticCircle
                title="Добавлено"
                onClick={changeFilterNavigate}
                filters={{ isCreatedByUser: true }}
                count={user.levelsCount || 0}
                userId={user.id}
                icon={<InIcon />}
              />
              <StatisticCircle
                title="В избранном"
                onClick={changeFilterNavigate}
                filters={{ isFavorite: true }}
                count={user.favoritesCount || 0}
                userId={user.id}
                icon={<FavoriteIcon />}
              />
              <StatisticCircle
                title="Оставлено комментариев"
                onClick={changeFilterNavigate}
                filters={{ isWithComment: true }}
                count={user.commentsCount || 0}
                userId={user.id}
                icon={<CommentFillIcon />}
              />
            </StyledBox>
          </StyledDrawerBlock>
        ))}
      </StyledBox>
    </StyledBox>
  );
};
