import clsx from "clsx";
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
export const Sidebar = React.forwardRef<HTMLDivElement, Partial<Props> & React.HTMLAttributes<HTMLDivElement>>(
  ({ isOpen, className, ...props }, ref) => {
    const rootClassName = clsx(styles.sidebar, isOpen && styles.sidebarOpen, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
Sidebar.displayName = "Sidebar";
