import { StyledBox } from "@/ui/Box";
import React, { useState } from "react";
import { StyledTab } from "@/layout/drawer/Notifications/styled";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { Typography } from "@/ui/Typography";

export const Notifications = () => {
  const [tabIndex, setIsTabIndex] = useState(2);

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
      <Typography opacity={0.5}>Обновление 07 декабря 2025 (v 1.4.2)</Typography>
      <br />
      <Typography>
        • Теперь во вкладке уведомлений можно посмотреть информацию об обновлениях на сайте ⸜( ´ ꒳ ` )⸝
      </Typography>
      <br />
      <Typography>• Добавлена возможность удалять свои комментарии к картам, а также сообщения в чате</Typography>
      <br />
      <Typography>• Добавлено подтверждение действия при удалении своего прохождения</Typography>
      <br />
      <Typography>
        • Добавлено скрытие текста, размещенного в чате между ||, под спойлер. ||Пример текста, который будет скрыт||
      </Typography>
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
