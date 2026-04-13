import React from "react";
import { Property } from "csstype";
import styles from "./Icon.module.scss";

type IconButtonPropsTypes = {
  opacity?: Property.Opacity;
  margin?: Property.Margin;
  padding?: Property.Padding;
  right?: Property.Right;
  children?: React.ReactNode;
  className?: string;
};
export const IconButton = React.forwardRef<HTMLDivElement, IconButtonPropsTypes & React.HTMLAttributes<HTMLDivElement>>(
  ({ opacity, margin, padding, right, className, style, ...props }, ref) => (
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
  ),
);
IconButton.displayName = "IconButton";
