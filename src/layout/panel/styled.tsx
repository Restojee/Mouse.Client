import React from "react";
import styles from "./Panel.module.scss";

export const StyledTabsGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.tabsGroup, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledTabsGroup.displayName = "StyledTabsGroup";

export const StyledTabSlideIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.tabSlideIndicator, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledTabSlideIndicator.displayName = "StyledTabSlideIndicator";

export const StyledPanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.panel, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledPanel.displayName = "StyledPanel";

export const StyledMobilePanel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.mobilePanel, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledMobilePanel.displayName = "StyledMobilePanel";
