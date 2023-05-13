import React from 'react';
import { useTheme } from "styled-components";
import { DefaultTheme } from "../../layout/theme/constants";
import { SendIcon } from "@/svg/SendIcon";
import { Property } from "csstype";
import { StyledMessageSendForm, StyledMessageSendFormIcon, StyledMessageSendFormTextarea } from "@/ui/Messages/styled";

type PropsType = {
    bgColor: Property.BackgroundColor
}
export const MessageSendFormContainer = (props: Partial<PropsType>) => {

    const theme = useTheme() as typeof DefaultTheme

    return (
        <StyledMessageSendForm>
            <StyledMessageSendFormTextarea
                bgColor={props.bgColor}
                placeholder="Введите сообщение..."
            />
            <StyledMessageSendFormIcon>
                <SendIcon size="30px" color={theme.colors.textOnSecondary} />
            </StyledMessageSendFormIcon>
        </StyledMessageSendForm>
    );
}
