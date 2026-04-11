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
export const StyledSidebarSection = React.forwardRef<
  HTMLDivElement,
  Partial<Props> & React.HTMLAttributes<HTMLDivElement>
>(({ isOpen, justifyContent, gap, className, style, ...props }, ref) => {
  const classes = [styles.sidebarSection, className];
  classes.push(isOpen ? styles.sidebarSectionOpen : styles.sidebarSectionClosed);
  return (
    <div
      ref={ref}
      className={classes.filter(Boolean).join(" ")}
      style={{ justifyContent, gap, ...style }}
      {...props}
    />
  );
});
StyledSidebarSection.displayName = "StyledSidebarSection";
