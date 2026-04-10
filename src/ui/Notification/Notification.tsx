import React, { useEffect, useState } from "react";
import styles from "./Notification.module.scss";
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
    <div
      className={styles.wrapper}
      style={{
        maxHeight: 60 * 3 + 20 + 20,
        "--notification-count": `'${messages.length < 100 ? messages.length : "99+"}'`,
      } as React.CSSProperties}
      data-count={messages.length > 1 ? (messages.length < 100 ? messages.length : "99+") : undefined}
    >
      {messages.map(({ id, severity, text }) => (
        <div
          onMouseOver={stopTimer}
          onMouseLeave={startTimer}
          title={text}
          key={id}
          className={[styles.container, severity === "error" ? styles.severityError : severity === "success" ? styles.severitySuccess : ""].filter(Boolean).join(" ")}
        >
          <Typography isEllipsis>{text}</Typography>
          <div className={styles.icon} onClick={() => setIsOpen(id)}>
            <CloseIcon />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
