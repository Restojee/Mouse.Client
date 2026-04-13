import React from "react";
import clsx from "clsx";
import styles from "./MapContentSidebar.module.scss";

export const MapContentSidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
MapContentSidebar.displayName = "MapContentSidebar";
