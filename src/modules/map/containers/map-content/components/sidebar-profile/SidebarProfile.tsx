import { User } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { useUser } from "@/modules/user/hooks/useUser";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Avatar } from "@/ui/Avatar";
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography";
import React from "react";

type MapContentSidebarProfilePropsType = {
  user?: User;
  date: string;
};
export const SidebarProfile = (props: MapContentSidebarProfilePropsType) => {
  const { user, date } = props;
  const { onOpenUserModal } = useUser();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <StyledBox
        align="center"
        gap={10}
        padding="0 10px"
      >
        <Avatar
          size={36}
          image={getAvatarImageLink(user?.avatar)}
          username={user?.username}
        />
        <StyledBox
          direction="column"
          gap={2}
        >
          <Typography
            fontSize="0.9rem"
            isLink
            isEllipsis
            fontWeight="bold"
            onClick={() => onOpenUserModal(user?.id)}
          >
            {user?.username}
          </Typography>
          <Typography
            fontSize="0.75rem"
            opacity={0.6}
          >
            {date}
          </Typography>
        </StyledBox>
      </StyledBox>
    );
  }

  return (
    <StyledBox
      direction={"column"}
      align={"center"}
      gap={20}
      margin={"0 30px 0 30px"}
    >
      <Avatar
        size={80}
        image={getAvatarImageLink(user?.avatar)}
        username={user?.username}
      />
      <StyledBox
        direction="column"
        textAlign={"center"}
      >
        <Typography
          fontSize={"1.1rem"}
          isLink
          isEllipsis
          fontWeight="bold"
          onClick={() => onOpenUserModal(user?.id)}
        >
          {user?.username}
        </Typography>
        <Typography>{date}</Typography>
      </StyledBox>
    </StyledBox>
  );
};
