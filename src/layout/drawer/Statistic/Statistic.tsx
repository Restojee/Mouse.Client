import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import clsx from "clsx";
import drawerStyles from "@/layout/drawer/Drawer.module.scss";
import statStyles from "@/layout/drawer/Statistic/Statistic.module.scss";
import { useUser } from "@/modules/user/hooks/useUser";
import { getUsersThunk } from "@/modules/user/slice";
import { BookCheckFillIcon } from "@/svg/BookCheckFillIcon";
import { CommentFillIcon } from "@/svg/CommentFillIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { InIcon } from "@/svg/InIcon";
import { Avatar } from "@/ui/Avatar";
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
  }, [dispatch]);

  return (
    <div className={statStyles.statisticContainer}>
      <div className={drawerStyles.drawerHeader}>Статистика</div>
      {/*<SearchForm placeholder="Поиск по нику..."/>*/}
      <div className={statStyles.statisticList}>
        {users?.map((user) => {
          const blockClassName = clsx(
            drawerStyles.drawerBlock,
            user.id === currentUser?.id && drawerStyles.drawerBlockMy,
          );
          return (
            <div
              key={user.id}
              className={blockClassName}
            >
              <div className={statStyles.statisticUserRow}>
                <Avatar
                  size={60}
                  image={getAvatarImageLink(user.avatar, "display")}
                  username={user.username}
                />
                <div className={statStyles.statisticUserInfo}>
                  <div className={statStyles.statisticUserNameRow}>
                    <Typography>{user.username}</Typography>
                    <StarRating count={getUserStarsCount(user.id)} />
                  </div>
                  <div className={statStyles.statisticUserDate}>
                    <Typography
                      opacity="0.5"
                      title={formatDateTime(user.createdUtcDate)}
                      isEllipsis
                    >
                      Регистрация: {formatDateTime(user.createdUtcDate, true)}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className={statStyles.statisticStatsRow}>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
