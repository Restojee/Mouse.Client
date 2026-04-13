import React from "react";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";

type DropdownWrapperPropsType = React.HTMLAttributes<HTMLDivElement> & {
  top: string;
  right: string;
};

export const DropdownWrapper = React.forwardRef<HTMLDivElement, DropdownWrapperPropsType>(
  ({ top, right, style, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.wrapper, className)}
      style={{ top, right, ...style }}
      {...props}
    />
  ),
);
DropdownWrapper.displayName = "DropdownWrapper";

type DropdownContainerPropsType = React.HTMLAttributes<HTMLDivElement> & {
  width: string;
  isOpen?: boolean;
};

export const DropdownContainer = React.forwardRef<HTMLDivElement, DropdownContainerPropsType>(
  ({ width, isOpen: _isOpen, style, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.container, className)}
      style={{ width, maxWidth: width, ...style }}
      {...props}
    />
  ),
);
DropdownContainer.displayName = "DropdownContainer";

type DropdownListPropsType = React.HTMLAttributes<HTMLDivElement> & {
  width?: string;
  isOpen?: boolean;
};

export const DropdownList = React.forwardRef<HTMLDivElement, DropdownListPropsType>(
  ({ width: _width, isOpen: _isOpen, className, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.list, styles.listFlex, className)} {...props} />
  ),
);
DropdownList.displayName = "DropdownList";

type DropdownItemPropsType = React.HTMLAttributes<HTMLDivElement> & {
  blockedItem?: boolean;
};

export const DropdownItemStyled = React.forwardRef<HTMLDivElement, DropdownItemPropsType>(
  ({ blockedItem, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.item, blockedItem && styles.itemBlocked, className)}
      {...props}
    />
  ),
);
DropdownItemStyled.displayName = "DropdownItemStyled";
