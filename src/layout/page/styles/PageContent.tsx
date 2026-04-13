import clsx from "clsx";
import React from "react";
import styles from "./Page.module.scss";

export const PageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const rootClassName = clsx(styles.pageContent, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
PageContent.displayName = "PageContent";
