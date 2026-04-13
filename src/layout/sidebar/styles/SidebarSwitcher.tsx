import clsx from "clsx";
import React from "react";
import styles from "./Sidebar.module.scss";

export const SidebarSwitcher = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const rootClassName = clsx(styles.sidebarSwitcher, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
SidebarSwitcher.displayName = "SidebarSwitcher";
