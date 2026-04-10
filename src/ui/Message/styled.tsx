import React from "react";
import { Property } from "csstype";
import styles from "./Message.module.scss";

/** @deprecated Use CSS module classes directly */
export const StyledMapContentCount = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.contentCount, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledMapContentCount.displayName = "StyledMapContentCount";

/** @deprecated Use CSS module classes directly */
type StyledImageContainerPropsType = {
  borderRadius?: Property.BorderRadius;
  margin?: Property.Margin;
  width?: Property.Width;
  height?: Property.Height;
  maxHeight?: Property.MaxHeight;
  minHeight?: Property.MinHeight;
  bgColor?: Property.BackgroundColor;
};
export const StyledMapContentPreview = React.forwardRef<
  HTMLDivElement,
  StyledImageContainerPropsType & React.HTMLAttributes<HTMLDivElement>
>(({ borderRadius, margin, width, height, maxHeight, minHeight, bgColor, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.contentPreview, className].filter(Boolean).join(" ")}
    style={{
      borderRadius: borderRadius || "inherit",
      margin,
      width,
      height,
      maxHeight,
      minHeight,
      backgroundColor: bgColor,
      ...style,
    }}
    {...props}
  />
));
StyledMapContentPreview.displayName = "StyledMapContentPreview";
