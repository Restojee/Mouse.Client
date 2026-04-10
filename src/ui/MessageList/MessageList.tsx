import React, { ReactNode, Ref } from "react";
import { StyledBox } from "@/ui/Box";

type MessageListProps = {
  children: ReactNode;
  scrollRef?: Ref<HTMLDivElement>;
};

/**
 * Переиспользуемый контейнер списка сообщений/уведомлений.
 * Единый визуал для чата и уведомлений: вертикальный скролл, gap 10px.
 */
export const MessageList = ({ children, scrollRef }: MessageListProps) => {
  return (
    <StyledBox
      ref={scrollRef as React.Ref<HTMLDivElement>}
      direction="column"
      gap={10}
      padding="10px 12px 20px"
      overflow="auto"
      grow={1}
    >
      {children}
    </StyledBox>
  );
};
