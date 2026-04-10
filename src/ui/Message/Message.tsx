import { Comment } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { CloseIcon } from "@/svg/CloseIcon";
import { IconButton } from "@/ui/Button/IconButton";
import { MessageCard } from "@/ui/MessageCard/MessageCard";
import StarRating from "@/ui/StarRating/StarRating";
import { Property } from "csstype";
import React, { useCallback, useMemo, useState } from "react";
import { renderRichContent } from "@/ui/TextEditor/renderRichContent";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useSheet } from "@/ui/Sheet";
import { Avatar } from "@/ui/Avatar";
import { StyledBox } from "@/ui/Box";
import { TextLink } from "@/ui/TextLink/TextLink";
import { Typography } from "@/ui/Typography/styles/Typography";

type PropsType = {
  comment: Comment;
  onDelete?: (comment: Comment) => void;
  onUsernameClick?: (id: number) => void;
  onMentionClick?: (username: string) => void;
  padding?: Property.Padding;
  isDeleteView?: boolean;
  getStarsCount?: (id: number) => number;
  validUsernames?: string[];
};

export const Message = (props: PropsType) => {
  const { comment, onDelete, padding, onUsernameClick, onMentionClick, isDeleteView, getStarsCount, validUsernames } =
    props;
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const sheet = useSheet();

  const onDeleteHandler = () => {
    if (comment.id && onDelete) onDelete(comment);
  };

  const starsCount = useMemo(() => {
    if (!props.comment.user?.id) return 0;
    return getStarsCount?.(props.comment.user.id) ?? 0;
  }, [props.comment, getStarsCount]);

  const dateTime = useMemo(() => formatDateTime(comment.createdUtcDate), [comment]);
  const time = useMemo(() => formatDateTime(comment.createdUtcDate, false, true), [comment]);

  const content = useMemo(
    () => renderRichContent(comment.text ?? "", { onMentionClick }, validUsernames),
    [comment.text, onMentionClick, validUsernames],
  );

  const onAuthorClick = onUsernameClick && comment.user?.id ? () => onUsernameClick(comment.user!.id!) : undefined;

  const openAuthorSheet = useCallback(() => {
    const handle = sheet.show(
      <StyledBox
        direction="column"
        align="center"
        gap={12}
        padding="16px 24px 32px"
        width="100%"
      >
        <Avatar
          size={60}
          image={getAvatarImageLink(comment.user?.avatar)}
          username={comment.user?.username}
        />
        <StyledBox
          direction="column"
          align="center"
          gap={4}
        >
          <TextLink
            onClick={
              onAuthorClick
                ? () => {
                    onAuthorClick();
                    handle.close();
                  }
                : undefined
            }
            fontSize="1rem"
          >
            {comment.user?.username}
          </TextLink>
          <Typography
            fontSize="0.75rem"
            opacity={0.5}
            title={time}
          >
            {dateTime}
          </Typography>
        </StyledBox>
        <StarRating
          count={starsCount}
          size="lg"
        />
      </StyledBox>,
      {
        autoHeight: true,
        noHeader: true,
        withoutButtons: true,
        withoutTitle: true,
      },
    );
  }, [sheet, comment.user, onAuthorClick, dateTime, time, starsCount]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MessageCard
        avatar={getAvatarImageLink(comment.user?.avatar)}
        username={comment.user?.username}
        date={dateTime}
        dateTitle={time}
        onAuthorClick={onAuthorClick}
        onAvatarClick={isMobile ? openAuthorSheet : undefined}
        hideHeader={false}
        padding={padding}
        headerMiddle={<StarRating count={starsCount} />}
        headerEnd={
          isDeleteView && isHovered
            ? React.createElement(
                IconButton,
                { onClick: onDeleteHandler, isAdmin: true },
                React.createElement(CloseIcon),
              )
            : null
        }
      >
        {content}
      </MessageCard>
    </div>
  );
};
