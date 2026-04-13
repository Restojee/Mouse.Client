import clsx from "clsx";
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

export const NavLink = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  (
    { margin, isChecked, justifyContent, gap, isOpen, withBorder, isDisabled, hasPin, className, style, ...props },
    ref,
  ) => {
    const rootClassName = clsx(
      styles.navLink,
      !isDisabled && styles.navLinkClickable,
      isOpen !== undefined && (isOpen ? styles.navLinkOpen : styles.navLinkClosed),
      withBorder && styles.navLinkWithBorder,
      isDisabled && styles.navLinkDisabled,
      hasPin && styles.navLinkHasPin,
      isChecked && styles.navLinkChecked,
      className,
    );
    const rootStyle = { margin, justifyContent, gap, ...style };

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
NavLink.displayName = "NavLink";
