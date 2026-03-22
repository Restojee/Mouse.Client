import { StyledBox } from "@/ui/Box";
import React, { useEffect, useState } from "react";
import { StyledTab } from "@/layout/drawer/Notifications/styled";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { Typography } from "@/ui/Typography";
import { Divider } from "@/ui/Divider/Divider";
import { Display } from "@/ui/Display";
import { useNotifications } from "@/modules/notifications";

export const Notifications = () => {
  const [tabIndex, setIsTabIndex] = useState(2);
  const { notificationList, updateNotificationsCount } = useNotifications();

  useEffect(() => {
    updateNotificationsCount();
  }, []);

  return (
    <StyledBox
      height="100%"
      direction="column"
      padding="0 20px"
    >
      <StyledDrawerHeader>Уведомления</StyledDrawerHeader>
      <StyledBox
        gap="20px"
        margin={"0 0 40px 0"}
      >
        {tabsArray.map(({ label, disabled }, index) => (
          <StyledTab
            key={index}
            onClick={() => setIsTabIndex(index)}
            isActive={tabIndex === index}
            isDisabled={disabled}
          >
            {label}
          </StyledTab>
        ))}
      </StyledBox>
      <StyledBox
        direction={"column"}
        overflow={"auto"}
      >
        {notificationList.map((el, i) => (
          <>
            <Typography opacity={0.5}>{el.title}</Typography>
            <br />
            {el.content.map((content) => (
              <>
                <Typography>{content}</Typography>
                <br />
              </>
            ))}
            <Display condition={i + 1 < notificationList.length}>
              <Divider />
            </Display>
            <br />
          </>
        ))}
      </StyledBox>
    </StyledBox>
  );
};

const tabsArray = [
  {
    label: "Важное",
    disabled: true,
  },
  {
    label: "Общее",
    disabled: true,
  },
  {
    label: "Прочее",
  },
];
