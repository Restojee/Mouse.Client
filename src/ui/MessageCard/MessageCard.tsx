import React, { ReactNode } from "react";
import { Property } from "csstype";
import { StyledBox } from "@/ui/Box";
import { Avatar } from "@/ui/Avatar";
import { Typography } from "@/ui/Typography/styles/Typography";
import { TextLink } from "@/ui/TextLink/TextLink";
import { useAppTheme } from "@/hooks/useAppTheme";
import { StyledMessageText } from "@/ui/Message/styled";

type MessageCardProps = {
  avatar?: string;
  username?: string;
  date?: string;
  dateTitle?: string;
  onAuthorClick?: () => void;
  /** Контент между именем и датой (напр. звёздочки) */
  headerMiddle?: ReactNode;
  /** Контент после даты — прижат к правому краю (напр. кнопка удаления) */
  headerEnd?: ReactNode;
  padding?: Property.Padding;
  children?: ReactNode;
};

export const MessageCard = ({
  avatar,
  username,
  date,
  dateTitle,
  onAuthorClick,
  headerMiddle,
  headerEnd,
  padding,
  children,
}: MessageCardProps) => {
  const { theme } = useAppTheme();

  return (
    <StyledBox
      maxWidth="100%"
      bgColor={theme.colors.secondary}
      borderRadius="15px"
      padding={padding || "0 10px"}
      gap={15}
    >
      <Avatar
        image={avatar}
        username={username}
      />
      <StyledBox
        direction="column"
        grow={1}
        gap={5}
        overflow="hidden"
      >
        <StyledBox
          align="center"
          gap={5}
          minHeight={25}
        >
          <TextLink
            onClick={onAuthorClick}
            isEllipsis
          >
            {username}
          </TextLink>
          {headerMiddle}
          <Typography
            title={dateTitle}
            margin="0 0 0 auto"
            fontSize="0.7rem"
          >
            {date}
          </Typography>
          {headerEnd}
        </StyledBox>

        <StyledMessageText>{children}</StyledMessageText>
      </StyledBox>
    </StyledBox>
  );
};
