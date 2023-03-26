import React, { useEffect, useState } from "react";
import { SNotificationContainer, SNotificationIcon, SNotificationWrapper } from "./styled";
import { Typography } from "@/ui/Typography/styles/Typography";
import { CloseIcon } from "@/svg/CloseIcon";

type AppMessageType = {
    id: string;
    severity: "error" | "success";
    text: string;
};

const Notification = () => {
    const messages = [] as AppMessageType[];

    const [timerId, setTimerId] = useState(0);

    const setIsOpen = (id: string) => {
        // dispatch(hideAppMessage(id));
    };

    const stopTimer = () => {
        clearInterval(timerId);
    };

    const startTimer = () => {
        stopTimer();
        const id: number = window.setInterval(() => {
            // dispatch(setAppLastMessage());
        }, 2900);
        setTimerId(id);
    };

    useEffect(() => {
        messages.length ? startTimer() : stopTimer();
    }, [messages]);

    return messages ? (
        <SNotificationWrapper notificationsCount={messages.length < 100 ? messages.length : "99+"}>
            {messages.map(({ id, severity, text }) => (
                <SNotificationContainer
                    onMouseOver={stopTimer}
                    onMouseLeave={startTimer}
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
    ) : (
        <></>
    );
};

export default Notification;
