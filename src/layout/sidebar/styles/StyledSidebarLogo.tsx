import React from "react";
import styles from "./Sidebar.module.scss";

type Props = { isOpen: boolean };
export const StyledSidebarLogo = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isOpen, className, ...props }, ref) => {
    const classes = [styles.sidebarLogo, className];
    if (!isOpen) classes.push(styles.sidebarLogoHidden);
    return <div ref={ref} className={classes.filter(Boolean).join(" ")} {...props} />;
  },
);
StyledSidebarLogo.displayName = "StyledSidebarLogo";
