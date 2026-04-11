import React from "react";
import styles from "./Info.module.scss";

export const StyledInfoList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.infoList, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledInfoList.displayName = "StyledInfoList";

export const StyledInfoBlock = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.infoBlock, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledInfoBlock.displayName = "StyledInfoBlock";

export const StyledInfoTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.infoTitle, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledInfoTitle.displayName = "StyledInfoTitle";
