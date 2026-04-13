import React from "react";
import clsx from "clsx";
import styles from "./ContentSidebarBodyIcon.module.scss";

type Props = {
  disabled?: boolean;
};

export const ContentSidebarBodyIcon = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ disabled, className, ...props }, ref) => {
    const rootClassName = clsx(styles.root, disabled && styles.disabled, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
ContentSidebarBodyIcon.displayName = "ContentSidebarBodyIcon";
