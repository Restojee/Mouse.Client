import React from "react";
import { Property } from "csstype";
import styles from "./ScrollContainer.module.scss";

type StyledScrollWrapperPropsType = {
  isSlider?: boolean;
  grow?: Property.FlexGrow;
  maxHeight?: Property.MaxHeight;
  children?: React.ReactNode;
  className?: string;
};
export const StyledScrollWrapper = React.forwardRef<
  HTMLDivElement,
  StyledScrollWrapperPropsType & React.HTMLAttributes<HTMLDivElement>
>(({ isSlider, grow, maxHeight, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.scrollWrapper, isSlider && styles.scrollWrapperSlider, className].filter(Boolean).join(" ")}
    style={{ maxHeight, flexGrow: grow || "1", ...style }}
    {...props}
  />
));
StyledScrollWrapper.displayName = "StyledScrollWrapper";

type StyledScrollContainerPropsType = {
  padding?: Property.Padding;
  bgColor?: Property.BackgroundColor;
  borderRadius?: Property.BorderRadius;
  children?: React.ReactNode;
  className?: string;
};
export const StyledScrollContainer = React.forwardRef<
  HTMLDivElement,
  StyledScrollContainerPropsType & React.HTMLAttributes<HTMLDivElement>
>(({ padding, bgColor, borderRadius, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.scrollContainer, className].filter(Boolean).join(" ")}
    style={{ padding, backgroundColor: bgColor, borderRadius, ...style }}
    {...props}
  />
));
StyledScrollContainer.displayName = "StyledScrollContainer";
