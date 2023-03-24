import React, { ReactElement } from "react";
import {
    StyledButton,
    StyledButtonProps
} from "@/ui/Button/styles/StyledButton";
import { Typography } from "../Typography/styles/Typography";
import { Property } from "csstype";

export type ButtonProps = {
    append?: ReactElement;
    prepend?: ReactElement;
    label?: string;
    type?: "button" | "submit";
    onClick?: () => void;
    children?: ReactElement;
    bgColor?: Property.BackgroundColor
}
export const Button = (props: ButtonProps & StyledButtonProps) => {

    const { label, append, prepend, onClick, type = "button", children, ...styleProps } = props;

    return (
        <StyledButton onClick={ onClick } type={ type } { ...styleProps } >
            { prepend }
            { children || <Typography isEllipsis>{ label }</Typography> }
            { append }
        </StyledButton>
    )
}
