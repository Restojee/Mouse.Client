import { StyledBox } from "@/ui/Box";
import React, { useState } from "react";
import { StyledTab } from "@/layout/drawer/Notifications/styled";
import { StyledDrawerHeader } from "@/layout/drawer/styled";
import { Typography } from "@/ui/Typography";
import { Divider } from "@/ui/Divider/Divider";
import { Display } from "@/ui/Display";

const updates = [
  {
    title: "Обновление 13 февраля 2025 (v 1.4.4)",
    content: [
      "• Окно входа в аккаунт теперь стало... побольше ╮(￣ω￣;)╭",
      "• В окне входа в аккаунт теперь можно узнать, что регистрация доступна только по приглашениям",
    ],
  },
  {
    title: "Обновление 07 февраля 2025 (v 1.4.3)",
    content: [
      "• Добавлены звезды самым активным шаманам ヽ(￣ω￣(。。 )ゝ",
      "• Добавлено отображение процента пройденных карт",
      "• Исправлен баг заголовка полезной инфы",
    ],
  },
  {
    title: "Обновление 07 декабря 2024 (v 1.4.2)",
    content: [
      "• Теперь во вкладке уведомлений можно посмотреть информацию об обновлениях на сайте ⸜( ´ ꒳ ` )⸝",
      "• Добавлена возможность удалять свои комментарии к картам, а также сообщения в чате",
      "• Добавлено подтверждение действия при удалении своего прохождения",
      "• Добавлено скрытие текста, размещенного в чате между ||, под спойлер. ||Пример текста, который будет скрыт||",
    ],
  },
];

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
      <StyledBox
        direction={"column"}
        overflow={"auto"}
      >
        {updates.map((el, i) => (
          <>
            <Typography opacity={0.5}>{el.title}</Typography>
            <br />
            {el.content.map((content) => (
              <>
                <Typography>{content}</Typography>
                <br />
              </>
            ))}
            <Display condition={i + 1 < updates.length}>
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
