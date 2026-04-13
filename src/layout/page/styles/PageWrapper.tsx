import clsx from "clsx";
import React from "react";
import styles from "./Page.module.scss";

export const PageWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const rootClassName = clsx(styles.pageWrapper, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
PageWrapper.displayName = "PageWrapper";
