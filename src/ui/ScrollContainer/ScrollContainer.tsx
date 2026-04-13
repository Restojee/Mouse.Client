import React from "react";
import { Property } from "csstype";
import styles from "./ScrollContainer.module.scss";

type ScrollWrapperPropsType = {
  isSlider?: boolean;
  grow?: Property.FlexGrow;
  maxHeight?: Property.MaxHeight;
  children?: React.ReactNode;
  className?: string;
};
export const ScrollWrapper = React.forwardRef<
  HTMLDivElement,
  ScrollWrapperPropsType & React.HTMLAttributes<HTMLDivElement>
>(({ isSlider, grow, maxHeight, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.scrollWrapper, isSlider && styles.scrollWrapperSlider, className].filter(Boolean).join(" ")}
    style={{ maxHeight, flexGrow: grow || "1", ...style }}
    {...props}
  />
));
ScrollWrapper.displayName = "ScrollWrapper";

type ScrollContainerPropsType = {
  padding?: Property.Padding;
  bgColor?: Property.BackgroundColor;
  borderRadius?: Property.BorderRadius;
  children?: React.ReactNode;
  className?: string;
};
export const ScrollContainer = React.forwardRef<
  HTMLDivElement,
  ScrollContainerPropsType & React.HTMLAttributes<HTMLDivElement>
>(({ padding, bgColor, borderRadius, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.scrollContainer, className].filter(Boolean).join(" ")}
    style={{ padding, backgroundColor: bgColor, borderRadius, ...style }}
    {...props}
  />
));
ScrollContainer.displayName = "ScrollContainer";
