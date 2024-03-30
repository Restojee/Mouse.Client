import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import {
    StyledButton,
    StyledButtonProps,
} from '@/ui/Button/styles/StyledButton';
import { Typography } from '@/ui/Typography';
import { Property } from 'csstype';

export type ButtonProps = ButtonHTMLAttributes<any> & {
    append?: ReactElement;
    prepend?: ReactElement;
    label?: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
    children?: ReactElement;
    bgColor?: Property.BackgroundColor;
    borderRadius?: Property.BorderRadius;
    color?: Property.Color;
}
export const Button = (props: ButtonProps & StyledButtonProps) => {

    const {
        label,
        append,
        prepend,
        onClick,
        type = 'button',
        children,
        size = "md",
        ...restProps
    } = props;

    return (
        <StyledButton
            onClick={onClick}
            type={type}
            size={size}
            {...restProps}
        >
            {prepend}
            {children || <Typography isEllipsis>{label}</Typography>}
            {append}
        </StyledButton>
    );
};
