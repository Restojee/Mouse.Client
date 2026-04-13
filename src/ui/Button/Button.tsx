import { Typography } from "@/ui/Typography";
import { Property } from "csstype";
import React, { ButtonHTMLAttributes, ReactElement } from "react";
import buttonStyles from "./styles/Button.module.scss";

export type ButtonVariant = "primary" | "outline" | "ghost";

export type StyledButtonProps = {
  justify?: Property.JustifyContent;
  borderRadius?: Property.BorderRadius;
  fontSize?: Property.FontSize;
  width?: Property.Width;
  bgColor?: Property.BackgroundColor;
  color?: Property.Color;
  margin?: string | number;
  padding?: Property.Padding;
  size?: "sm" | "md" | "lg";
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isWithError?: boolean;
  disabled?: boolean;
  isBold?: boolean;
};

export type ButtonProps = ButtonHTMLAttributes<never> & {
  append?: ReactElement;
  prepend?: ReactElement;
  label?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  children?: ReactElement;
  bgColor?: Property.BackgroundColor;
  borderRadius?: Property.BorderRadius;
  color?: Property.Color;
};

const sizeClassMap: Record<string, string> = {
  sm: buttonStyles.sizeSm,
  md: buttonStyles.sizeMd,
  lg: buttonStyles.sizeLg,
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary: buttonStyles.variantPrimary,
  outline: buttonStyles.variantOutline,
  ghost: buttonStyles.variantGhost,
};

export const Button = (props: ButtonProps & StyledButtonProps) => {
  const {
    label,
    append,
    prepend,
    onClick,
    type = "button",
    children,
    size = "md",
    variant = "primary",
    fullWidth,
    justify = "center",
    bgColor,
    color,
    borderRadius = "50px",
    width = "min-content",
    margin = "",
    padding,
    disabled,
    isBold,
    className,
    style,
    ...restProps
  } = props;

  const classes = [
    buttonStyles.button,
    sizeClassMap[size],
    variantClassMap[variant],
    fullWidth && buttonStyles.fullWidth,
    disabled && buttonStyles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const computedStyle: React.CSSProperties = {
    justifyContent: justify,
    ...(fullWidth ? {} : { width }),
    margin,
    fontWeight: isBold ? 600 : 200,
    ...(color !== undefined && { color }),
    ...(bgColor !== undefined && { backgroundColor: bgColor }),
    borderRadius,
    ...(padding !== undefined && { padding }),
    ...style,
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={classes}
      style={computedStyle}
      disabled={disabled}
      {...restProps}
    >
      {prepend}
      {children || <Typography isEllipsis>{label}</Typography>}
      {append}
    </button>
  );
};
