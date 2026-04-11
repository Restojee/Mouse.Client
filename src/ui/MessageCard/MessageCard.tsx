import React, { ReactNode } from "react";
import { Property } from "csstype";
import { StyledBox } from "@/ui/Box";
import { Avatar } from "@/ui/Avatar";
import { Typography } from "@/ui/Typography/styles/Typography";
import { TextLink } from "@/ui/TextLink/TextLink";
import { useAppTheme } from "@/hooks/useAppTheme";
import messageStyles from "@/ui/Message/Message.module.scss";

type MessageCardProps = {
  avatar?: string;
  username?: string;
  date?: string;
  dateTitle?: string;
  onAuthorClick?: () => void;
  onAvatarClick?: () => void;
  /** Контент между именем и датой (напр. звёздочки) */
  headerMiddle?: ReactNode;
  /** Контент после даты — прижат к правому краю (напр. кнопка удаления) */
  headerEnd?: ReactNode;
  padding?: Property.Padding;
  children?: ReactNode;
  /** Скрыть строку с именем/датой (на мобиле — в шит) */
  hideHeader?: boolean;
};

export const MessageCard = ({
  avatar,
  username,
  date,
  dateTitle,
  onAuthorClick,
  onAvatarClick,
  headerMiddle,
  headerEnd,
  padding,
  children,
  hideHeader = false,
}: MessageCardProps) => {
  const { theme } = useAppTheme();

  return (
    <StyledBox
      maxWidth="100%"
      bgColor={theme.colors.secondary}
      border={`1px solid ${theme.colors.input.border}`}
      borderRadius="15px"
      padding={padding || "8px 10px"}
      gap={15}
    >
      <div
        onClick={onAvatarClick}
        style={onAvatarClick ? { cursor: "pointer", flexShrink: 0 } : { flexShrink: 0 }}
      >
        <Avatar
          image={avatar}
          username={username}
        />
      </div>
      <StyledBox
        direction="column"
        grow={1}
        gap={5}
        overflow="hidden"
      >
        {!hideHeader && (
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
        )}
        <div className={messageStyles.messageText}>{children}</div>
      </StyledBox>
    </StyledBox>
  );
};
