import React from "react";
import { StatisticCircle } from "@/layout/drawer/Statistic/components/StatisticCircle";
import { BookCheckFillIcon } from "@/svg/BookCheckFillIcon";
import { CommentFillIcon } from "@/svg/CommentFillIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { InIcon } from "@/svg/InIcon";
import { Avatar } from "@/ui/Avatar";
import { Button } from "@/ui/Button";
import { Typography } from "@/ui/Typography";
import StarRating from "@/ui/StarRating/StarRating";
import styles from "./UserModal.module.scss";
import { UserModalSkeleton } from "./UserModalSkeleton";
import { useUserModal } from "./useUserModal";

type UserModalPropsType = {
  onClose?: () => void;
};

const UserModal = ({ onClose }: UserModalPropsType) => {
  const {
    currentUserView,
    starsCount,
    avatarImage,
    registrationDateFull,
    registrationDateShort,
    closeButtonColor,
    onFilterClick,
  } = useUserModal({ onClose });

  if (!currentUserView) {
    return <UserModalSkeleton />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.profile}>
        <Avatar size={100} image={avatarImage} username={currentUserView?.username} />
        <StarRating count={starsCount} size={"lg"} />
        <div className={styles.meta}>
          <div className={styles.metaRow}>
            <Typography className={styles.metaText} title={registrationDateFull} isEllipsis>
              Регистрация: {registrationDateShort}
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.stats}>
        <StatisticCircle
          title="Выполнено"
          onClick={onFilterClick}
          filters={{ isCompleted: true }}
          count={currentUserView?.completedCount || 0}
          userId={currentUserView?.id}
          icon={<BookCheckFillIcon />}
          showPercent
        />
        <StatisticCircle
          title="Добавлено"
          onClick={onFilterClick}
          filters={{ isCreatedByUser: true }}
          count={currentUserView?.levelsCount || 0}
          userId={currentUserView?.id}
          icon={<InIcon />}
        />
        <StatisticCircle
          title="В избранном"
          onClick={onFilterClick}
          filters={{ isFavorite: true }}
          count={currentUserView?.favoritesCount || 0}
          userId={currentUserView?.id}
          icon={<FavoriteIcon />}
        />
        <StatisticCircle
          title="Оставлено комментариев"
          onClick={onFilterClick}
          filters={{ isWithComment: true }}
          count={currentUserView?.commentsCount || 0}
          userId={currentUserView?.id}
          icon={<CommentFillIcon />}
        />
      </div>
      <Button color={closeButtonColor} size={"lg"} label={"Закрыть"} onClick={onClose} />
    </div>
  );
};

export default UserModal;
