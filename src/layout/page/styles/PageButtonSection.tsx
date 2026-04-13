import clsx from "clsx";
import React from "react";
import styles from "./Page.module.scss";

export const PagePaneBlock = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const rootClassName = clsx(styles.pageButtonSection, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
PagePaneBlock.displayName = "PagePaneBlock";
