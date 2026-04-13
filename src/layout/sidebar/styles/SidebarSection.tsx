import clsx from "clsx";
import React from "react";
import { Property } from "csstype";
import styles from "./Sidebar.module.scss";

export type Props = {
  transition?: Property.Transition;
  gap?: Property.Gap;
  justifyContent?: Property.JustifyContent;
  isOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
};
export const SidebarSection = React.forwardRef<HTMLDivElement, Partial<Props> & React.HTMLAttributes<HTMLDivElement>>(
  ({ isOpen, justifyContent, gap, className, style, ...props }, ref) => {
    const rootClassName = clsx(
      styles.sidebarSection,
      isOpen ? styles.sidebarSectionOpen : styles.sidebarSectionClosed,
      className,
    );
    const rootStyle = { justifyContent, gap, ...style };
    return (
      <div
        ref={ref}
        className={rootClassName}
        style={rootStyle}
        {...props}
      />
    );
  },
);
SidebarSection.displayName = "SidebarSection";
