import { useMemo } from "react";
import { GetMapsApiArg, User } from "@/api/codegen/genMouseMapsApi";
import { BookCheckFillIcon } from "@/svg/BookCheckFillIcon";
import { CommentFillIcon } from "@/svg/CommentFillIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { InIcon } from "@/svg/InIcon";
import { StatisticItem, StatisticList } from "./StatisticList";

type Props = {
  user?: User;
  onFilterClick: (filters: Partial<GetMapsApiArg>) => void;
};

export const StatisticPanel = ({ user, onFilterClick }: Props) => {
  const items = useMemo<StatisticItem[]>(
    () => [
      {
        title: "Выполнено",
        filters: { isCompleted: true },
        count: user?.completedCount || 0,
        icon: <BookCheckFillIcon />,
        showPercent: true,
      },
      {
        title: "Добавлено",
        filters: { isCreatedByUser: true },
        count: user?.levelsCount || 0,
        icon: <InIcon />,
      },
      {
        title: "В избранном",
        filters: { isFavorite: true },
        count: user?.favoritesCount || 0,
        icon: <FavoriteIcon />,
      },
      {
        title: "Оставлено комментариев",
        filters: { isWithComment: true },
        count: user?.commentsCount || 0,
        icon: <CommentFillIcon />,
      },
    ],
    [user?.completedCount, user?.levelsCount, user?.favoritesCount, user?.commentsCount],
  );

  return (
    <StatisticList
      items={items}
      userId={user?.id}
      onFilterClick={onFilterClick}
    />
  );
};
