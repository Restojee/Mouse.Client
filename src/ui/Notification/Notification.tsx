import React, { useEffect, useState } from "react";
import { SNotificationContainer, SNotificationIcon, SNotificationWrapper } from "./styled";
import { Typography } from "@/ui/Typography/styles/Typography";
import { CloseIcon } from "@/svg/CloseIcon";
import { hideAppMessage, setAppLastMessage } from "@/bll/appReducer";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

const Notification = () => {
  const dispatch = useAppDispatch();

  const messages = useAppSelector((state) => state.app.messages);

  const [timerId, setTimerId] = useState(0);

  const setIsOpen = (id: string) => {
    dispatch(hideAppMessage(id));
  };

  const stopTimer = () => {
    clearInterval(timerId);
  };

  const startTimer = () => {
    stopTimer();
    const id: number = window.setInterval(() => {
      dispatch(setAppLastMessage());
    }, 2900);
    setTimerId(id);
  };

  useEffect(() => {
    messages.length ? startTimer() : stopTimer();
  }, [messages]);

  if (!messages) {
    return null;
  }

  return (
    <SNotificationWrapper notificationsCount={messages.length < 100 ? messages.length : "99+"}>
      {messages.map(({ id, severity, text }) => (
        <SNotificationContainer
          onMouseOver={stopTimer}
          onMouseLeave={startTimer}
          title={text}
          key={id}
          severity={severity}
        >
          <Typography isEllipsis>{text}</Typography>
          <SNotificationIcon onClick={() => setIsOpen(id)}>
            <CloseIcon />
          </SNotificationIcon>
        </SNotificationContainer>
      ))}
    </SNotificationWrapper>
  );
};

export default Notification;
