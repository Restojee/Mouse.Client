import { Typography } from "@/ui/Typography";
import { StyledBox } from "@/ui/Box";
import React from "react";

export const EmptyNotifications = () => {
  return (
    <StyledBox
      align={"center"}
      justify={"center"}
      direction="column"
      height={400}
    >
      <Typography opacity="0.6">Уведомлений пока нет</Typography>
    </StyledBox>
  );
};
