import { StyledBox } from "@/ui/Box";
import React, { useState } from "react";
import { Typography } from "@/ui/Typography/styles/Typography";
import { StyledTab } from "@/layout/drawer/Notifications/styled";
import { StyledDrawerHeader } from "@/layout/drawer/styled";

export const Notifications = () => {
  const [tabIndex, setIsTabIndex] = useState(0);

  return (
    <StyledBox
      height="100%"
      direction="column"
      padding="0 20px"
    >
      <StyledDrawerHeader>Уведомления</StyledDrawerHeader>
      <StyledBox gap="20px">
        {tabsArray.map(({ label }, index) => (
          <StyledTab
            key={index}
            onClick={() => setIsTabIndex(index)}
            isActive={tabIndex === index}
          >
            {label}
          </StyledTab>
        ))}
      </StyledBox>
      {tabIndex === 0 && (
        <StyledBox
          align={"center"}
          justify={"center"}
          direction="column"
        >
          <Typography opacity="0.6">Уведомлений пока нет (Важные)</Typography>
        </StyledBox>
      )}
      {tabIndex === 1 && (
        <StyledBox
          align={"center"}
          justify={"center"}
          direction="column"
        >
          <Typography opacity="0.6">Уведомлений пока нет (Общие)</Typography>
        </StyledBox>
      )}
      {tabIndex === 2 && (
        <StyledBox
          align={"center"}
          justify={"center"}
          direction="column"
        >
          <Typography opacity="0.6">Уведомлений пока нет (Другие)</Typography>
        </StyledBox>
      )}
    </StyledBox>
  );
};

const tabsArray = [
  {
    label: "Важные",
  },
  {
    label: "Общие",
  },
  {
    label: "Другие",
  },
];
