import React from "react";
import { Property } from "csstype";
import styles from "./Navigation.module.scss";

type Props = {
  transition?: Property.Transition;
  isOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const StyledNavLinkSection = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isOpen, className, ...props }, ref) => {
    const classes = [styles.navLinkSection, className];
    if (isOpen) classes.push(styles.navLinkSectionOpen);
    return <div ref={ref} className={classes.filter(Boolean).join(" ")} {...props} />;
  },
);
StyledNavLinkSection.displayName = "StyledNavLinkSection";
