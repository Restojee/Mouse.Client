import { Comment } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppTheme } from "@/hooks/useAppTheme";
import { CloseIcon } from "@/svg/CloseIcon";
import { Avatar } from "@/ui/Avatar";
import { StyledBox } from "@/ui/Box";
import { IconButton } from "@/ui/Button/IconButton";
import { Display } from "@/ui/Display";
import { Typography } from "@/ui/Typography/styles/Typography";
import { Property } from "csstype";
import React, { useMemo, useState } from "react";
import { StyledMessageText } from "./styled";
import { Spoiler } from "./Spoiler";

type PropsType = {
  comment: Comment;
  onDelete?: (comment: Comment) => void;
  onUsernameClick?: (id: number) => void;
  padding?: Property.Padding;
  isDeleteView?: boolean;
};
export const Message = (props: PropsType) => {
  const { comment, onDelete, padding, onUsernameClick, isDeleteView } = props;
  const [isHovered, setIsHovered] = useState(false);

  const { theme } = useAppTheme();

  const onDeleteHandler = () => {
    if (comment.id && onDelete) {
      onDelete(comment);
    }
  };

  const renderMessage = () => {
    const spoilerRegex = /\|\|(.+?)\|\|/g;

    const parts = comment.text?.split(spoilerRegex); // Разбиваем текст по спойлеру
    return parts?.map((part, index) =>
      index % 2 === 1 ? ( // Если индекс нечётный, это спойлер
        <Spoiler key={index}>{part}</Spoiler>
      ) : (
        part // Обычный текст
      ),
    );
  };

  const onAuthorClickHandler = () => {
    if (comment.user?.id && onUsernameClick) {
      onUsernameClick(comment.user?.id);
    }
  };

  const dateTime = useMemo(() => {
    return formatDateTime(comment.createdUtcDate);
  }, [comment]);

  const time = useMemo(() => {
    return formatDateTime(comment.createdUtcDate, false, true);
  }, [comment]);

  return (
    <StyledBox
      maxWidth={"100%"}
      bgColor={theme.colors.secondary}
      borderRadius={"15px"}
      padding={padding || "0 10px"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      gap={15}
    >
      <Avatar
        image={getAvatarImageLink(comment.user?.avatar)}
        username={comment.user?.username}
      />
      <StyledBox
        direction={"column"}
        grow={1}
        gap={5}
        overflow={"hidden"}
      >
        <StyledBox
          align="center"
          gap={5}
          minHeight={25}
        >
          <Typography
            margin={"0 auto 0 0"}
            isEllipsis
            onClick={onAuthorClickHandler}
            isLink
          >
            {comment.user?.username}
          </Typography>
          <Typography
            title={time}
            fontSize={"0.7rem"}
          >
            {dateTime}
          </Typography>
          <Display condition={isDeleteView && isHovered}>
            <StyledBox>
              <IconButton
                onClick={onDeleteHandler}
                isAdmin
              >
                <CloseIcon />
              </IconButton>
            </StyledBox>
          </Display>
        </StyledBox>

        <StyledMessageText>{renderMessage()}</StyledMessageText>
      </StyledBox>
    </StyledBox>
  );
};
