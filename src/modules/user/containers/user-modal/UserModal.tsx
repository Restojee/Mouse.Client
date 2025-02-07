import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppTheme } from "@/hooks/useAppTheme";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { useUser } from "@/modules/user/hooks/useUser";
import { BookCheckFillIcon } from "@/svg/BookCheckFillIcon";
import { CommentFillIcon } from "@/svg/CommentFillIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { InIcon } from "@/svg/InIcon";
import { Avatar } from "@/ui/Avatar";
import { StyledBox } from "@/ui/Box";
import { Button } from "@/ui/Button";
import { Modal } from "@/ui/Modal/Modal";
import { Typography } from "@/ui/Typography";
import React, { useMemo } from "react";
import { getStarsByUserId } from "@/modules/user/utils/getStarsByUserId";
import StarRating from "@/ui/StarRating/StarRating";
import { StatisticCircle } from "@/layout/drawer/Statistic/components/StatisticCircle";

const UserModal = () => {
  const { onCloseUserModal, currentUserView, users } = useUser();
  const { theme } = useAppTheme();
  const { closeMap, levelId } = useMapView();
  const { changeFilterNavigate } = useFilterQueryParams();

  const getUserStarsCount = useMemo(() => {
    return getStarsByUserId(currentUserView?.id, users);
  }, [currentUserView?.id, users]);

  const onFilterClick = async (filter: Partial<GetMapsApiArg>) => {
    await changeFilterNavigate(filter);
    onCloseUserModal();

    if (levelId) {
      await closeMap();
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onCloseUserModal}
      title={currentUserView?.username}
      withoutButtons
    >
      <StyledBox
        align={"center"}
        direction={"column"}
        gap={20}
        width={"100%"}
      >
        <StyledBox
          align="center"
          gap={20}
          overflow={"hidden"}
          direction={"column"}
          width={"100%"}
        >
          <Avatar
            size={100}
            image={getAvatarImageLink(currentUserView?.avatar)}
            username={currentUserView?.username}
          />
          <StyledBox align="center">
            <StarRating
              count={getUserStarsCount}
              size={"lg"}
            />
          </StyledBox>
          <StyledBox
            gap="5px"
            direction="column"
            overflow={"hidden"}
          >
            <StyledBox overflow={"hidden"}>
              <Typography
                opacity="0.5"
                title={formatDateTime(currentUserView?.createdUtcDate)}
                isEllipsis
              >
                Регистрация: {formatDateTime(currentUserView?.createdUtcDate, true)}
              </Typography>
            </StyledBox>
          </StyledBox>
        </StyledBox>
        <StyledBox
          width={"100%"}
          align="center"
          justify={"space-between"}
        >
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
        </StyledBox>
        <Button
          color={theme.colors.brandColorContrastText}
          size={"lg"}
          label={"Закрыть"}
          onClick={onCloseUserModal}
        />
      </StyledBox>
    </Modal>
  );
};

export default UserModal;
