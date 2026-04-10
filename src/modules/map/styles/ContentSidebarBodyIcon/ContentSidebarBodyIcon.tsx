import React from "react";
import styles from "./ContentSidebarBodyIcon.module.scss";

type Props = {
  disabled?: boolean;
};

export const ContentSidebarBodyIcon = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ disabled, className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.root, disabled && styles.disabled, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
ContentSidebarBodyIcon.displayName = "ContentSidebarBodyIcon";
