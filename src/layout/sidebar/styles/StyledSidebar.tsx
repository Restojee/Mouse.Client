import React from "react";
import { Property } from "csstype";
import styles from "./Sidebar.module.scss";

type Props = {
  isOpen: boolean;
  transition?: Property.Transition;
  sidebarXPadding?: Property.Padding;
  children?: React.ReactNode;
  className?: string;
};
export const StyledSidebar = React.forwardRef<HTMLDivElement, Partial<Props> & React.HTMLAttributes<HTMLDivElement>>(
  ({ isOpen, className, ...props }, ref) => {
    const classes = [styles.sidebar, className];
    if (isOpen) classes.push(styles.sidebarOpen);
    return (
      <div
        ref={ref}
        className={classes.filter(Boolean).join(" ")}
        {...props}
      />
    );
  },
);
StyledSidebar.displayName = "StyledSidebar";
