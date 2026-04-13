import { Typography } from "@/ui/Typography";
import { Box } from "@/ui/Box";
import React from "react";

export const EmptyNotifications = () => {
  return (
    <Box
      align={"center"}
      justify={"center"}
      direction="column"
      height={400}
    >
      <Typography opacity="0.6">Уведомлений пока нет</Typography>
    </Box>
  );
};
