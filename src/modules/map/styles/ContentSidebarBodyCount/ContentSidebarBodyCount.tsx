import React from "react";
import clsx from "clsx";
import styles from "./ContentSidebarBodyCount.module.scss";

export const ContentSidebarBodyCount = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const rootClassName = clsx(styles.root, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
ContentSidebarBodyCount.displayName = "ContentSidebarBodyCount";
