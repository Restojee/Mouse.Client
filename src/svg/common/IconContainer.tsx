import React from "react";
import { Property } from "csstype";
import { Typography } from "@/ui/Typography/styles/Typography";
import styles from "./Icon.module.scss";

type StyledIconContainerPropsTypes = {
  opacity?: Property.Opacity;
  margin?: Property.Margin;
  padding?: Property.Padding;
  right?: Property.Right;
  children?: React.ReactNode;
  className?: string;
};
export const StyledIconContainer = React.forwardRef<
  HTMLDivElement,
  StyledIconContainerPropsTypes & React.HTMLAttributes<HTMLDivElement>
>(({ opacity, margin, padding, right, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.iconContainer, className].filter(Boolean).join(" ")}
    style={{
      margin,
      padding,
      opacity,
      ...(right && { marginLeft: "auto", backgroundColor: "red" }),
      ...style,
    }}
    {...props}
  />
));
StyledIconContainer.displayName = "StyledIconContainer";

export const StyledIconText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <Typography ref={ref} className={[styles.iconText, className].filter(Boolean).join(" ")} {...props} />
));
StyledIconText.displayName = "StyledIconText";
