import clsx from "clsx";
import React from "react";
import styles from "./Sidebar.module.scss";

type Props = { isOpen: boolean };
export const SidebarLogo = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isOpen, className, ...props }, ref) => {
    const rootClassName = clsx(styles.sidebarLogo, !isOpen && styles.sidebarLogoHidden, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
SidebarLogo.displayName = "SidebarLogo";
