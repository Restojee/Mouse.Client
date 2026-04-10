import React from "react";
import styles from "./Drawer.module.scss";

type StyledDrawerProps = { isOpen: boolean };
export const StyledDrawer = React.forwardRef<HTMLDivElement, StyledDrawerProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ isOpen, className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.drawer, isOpen ? styles.drawerOpen : styles.drawerClosed, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledDrawer.displayName = "StyledDrawer";

export const StyledDrawerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.drawerContent, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledDrawerContent.displayName = "StyledDrawerContent";

export const StyledDrawerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.drawerHeader, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledDrawerHeader.displayName = "StyledDrawerHeader";

type StyledDrawerBlockProps = { isMyCard: boolean };
export const StyledDrawerBlock = React.forwardRef<HTMLDivElement, StyledDrawerBlockProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ isMyCard, className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.drawerBlock, isMyCard && styles.drawerBlockMy, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
StyledDrawerBlock.displayName = "StyledDrawerBlock";
