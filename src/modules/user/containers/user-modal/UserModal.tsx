import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppTheme } from "@/hooks/useAppTheme";
import useQueryParams from "@/hooks/useQueryParams";
import { StyledStatisticIconContainer, StyledStatisticIconText } from "@/layout/drawer/Statistic/styled";
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
import React from "react";

const UserModal = () => {
  const { onCloseUserModal, currentUserView, getMapsPercent } = useUser();

  const { theme } = useAppTheme();

  const { closeMap, levelId } = useMapView();

  const { changeFilterNavigate } = useQueryParams();

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
          <StyledBox
            grow="1"
            justify="center"
            title="Выполнено"
            onClick={() => onFilterClick({ isCompleted: true, userId: currentUserView?.id })}
          >
            <StyledStatisticIconContainer fillingPercent={`${getMapsPercent(currentUserView?.completedCount)}%`}>
              <BookCheckFillIcon />
              <StyledStatisticIconText>{currentUserView?.completedCount}</StyledStatisticIconText>
            </StyledStatisticIconContainer>
          </StyledBox>
          <StyledBox
            onClick={() => onFilterClick({ isCreatedByUser: true, userId: currentUserView?.id })}
            grow="1"
            justify="center"
            title="Добавлено"
          >
            <StyledStatisticIconContainer fillingPercent={`${getMapsPercent(currentUserView?.levelsCount)}%`}>
              <InIcon />
              <StyledStatisticIconText>{currentUserView?.levelsCount}</StyledStatisticIconText>
            </StyledStatisticIconContainer>
          </StyledBox>
          <StyledBox
            onClick={() => onFilterClick({ isFavorite: true, userId: currentUserView?.id })}
            grow="1"
            justify="center"
            title="В избранном"
          >
            <StyledStatisticIconContainer>
              <FavoriteIcon />
              <StyledStatisticIconText>{currentUserView?.favoritesCount}</StyledStatisticIconText>
            </StyledStatisticIconContainer>
          </StyledBox>
          <StyledBox
            onClick={() => onFilterClick({ isWithComment: true, userId: currentUserView?.id })}
            grow="1"
            justify="center"
            title="Оставлено комментариев"
          >
            <StyledStatisticIconContainer>
              <CommentFillIcon />
              <StyledStatisticIconText>{currentUserView?.commentsCount}</StyledStatisticIconText>
            </StyledStatisticIconContainer>
          </StyledBox>
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
