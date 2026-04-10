import React from "react";
import { Property } from "csstype";
import styles from "./Icon.module.scss";

type StyledIconButtonPropsTypes = {
  opacity?: Property.Opacity;
  margin?: Property.Margin;
  padding?: Property.Padding;
  right?: Property.Right;
  children?: React.ReactNode;
  className?: string;
};
export const StyledIconButton = React.forwardRef<
  HTMLDivElement,
  StyledIconButtonPropsTypes & React.HTMLAttributes<HTMLDivElement>
>(({ opacity, margin, padding, right, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.iconButton, className].filter(Boolean).join(" ")}
    style={{
      opacity,
      margin,
      padding,
      ...(right && { marginLeft: "auto" }),
      ...style,
    }}
    {...props}
  />
));
StyledIconButton.displayName = "StyledIconButton";
