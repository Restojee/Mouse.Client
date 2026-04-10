import React from "react";
import styles from "./Notifications.module.scss";

export const StyledTabsRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.tabsRow, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledTabsRow.displayName = "StyledTabsRow";

export const StyledTabSlideIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.tabSlideIndicator, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledTabSlideIndicator.displayName = "StyledTabSlideIndicator";

type StyledTabProps = { isDisabled?: boolean; isActive: boolean };
export const StyledTab = React.forwardRef<HTMLDivElement, StyledTabProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ isDisabled, isActive, className, ...props }, ref) => {
    const classes = [styles.tab, className];
    if (isActive) classes.push(styles.tabActive);
    if (isDisabled) classes.push(styles.tabDisabled);
    return <div ref={ref} className={classes.filter(Boolean).join(" ")} {...props} />;
  },
);
StyledTab.displayName = "StyledTab";
