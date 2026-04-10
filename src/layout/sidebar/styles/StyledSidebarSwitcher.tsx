import React from "react";
import styles from "./Sidebar.module.scss";

export const StyledSidebarSwitcher = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.sidebarSwitcher, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledSidebarSwitcher.displayName = "StyledSidebarSwitcher";
