import React from "react";
import { Avatar } from "@/ui/Avatar";
import { Button } from "@/ui/Button";
import { Typography } from "@/ui/Typography";
import StarRating from "@/ui/StarRating/StarRating";
import styles from "./UserModal.module.scss";
import { StatisticPanel } from "./StatisticPanel";
import { UserModalSkeleton } from "./UserModalSkeleton";
import { useUserModal } from "./useUserModal";
import { Column } from "@/ui/Column";
import { Row } from "@/ui/Row";

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
    isMobile,
  } = useUserModal({ onClose });

  if (!currentUserView) {
    return <UserModalSkeleton />;
  }

  return (
    <Column className={styles.root}>
      <Column className={styles.profile}>
        <Avatar
          size={100}
          image={avatarImage}
          username={currentUserView?.username}
        />
        <Typography
          fontSize={16}
          fontWeight="bold"
          isEllipsis
        >
          {currentUserView?.username}
        </Typography>
        {starsCount > 0 && (
          <Row justify="space-between">
            <StarRating
              count={starsCount}
              size={"lg"}
            />
          </Row>
        )}
        <Column className={styles.meta}>
          <Column className={styles.metaRow}>
            <Typography
              className={styles.metaText}
              title={registrationDateFull}
              isEllipsis
            >
              Регистрация: {registrationDateShort}
            </Typography>
          </Column>
        </Column>
      </Column>
      <StatisticPanel
        user={currentUserView}
        onFilterClick={onFilterClick}
      />
      {!isMobile && (
        <Button
          color={closeButtonColor}
          size={"lg"}
          label={"Закрыть"}
          onClick={onClose}
        />
      )}
    </Column>
  );
};

export default UserModal;
