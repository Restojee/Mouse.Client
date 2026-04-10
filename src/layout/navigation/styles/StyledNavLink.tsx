import React from "react";
import { Property } from "csstype";
import styles from "./Navigation.module.scss";

type Props = {
  margin?: Property.Margin;
  justifyContent?: Property.JustifyContent;
  gap?: Property.Gap;
  isOpen?: boolean;
  withBorder?: boolean;
  isDisabled?: boolean;
  isChecked?: boolean;
  hasPin?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const StyledNavLink = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ margin, justifyContent, gap, isOpen, withBorder, isDisabled, hasPin, className, style, ...props }, ref) => {
    const classes = [styles.navLink, className];
    if (!isDisabled) classes.push(styles.navLinkClickable);
    if (isOpen !== undefined) classes.push(isOpen ? styles.navLinkOpen : styles.navLinkClosed);
    if (withBorder) classes.push(styles.navLinkWithBorder);
    if (isDisabled) classes.push(styles.navLinkDisabled);
    if (hasPin) classes.push(styles.navLinkHasPin);

    return (
      <div
        ref={ref}
        className={classes.filter(Boolean).join(" ")}
        style={{ margin, justifyContent, gap, ...style }}
        {...props}
      />
    );
  },
);
StyledNavLink.displayName = "StyledNavLink";
