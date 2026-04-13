import React from "react";
import { Property } from "csstype";
import styles from "./Navigation.module.scss";
import clsx from "clsx";

type Props = {
  transition?: Property.Transition;
  isOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const NavLinkSection = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isOpen, className, ...props }, ref) => {
    const classes = clsx(styles.navLinkSection, className, isOpen && styles.navLinkSectionOpen);

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      />
    );
  },
);
NavLinkSection.displayName = "NavLinkSection";
