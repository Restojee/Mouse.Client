import React from "react";
import clsx from "clsx";
import styles from "./MapCardHeader.module.scss";

export const MapCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
MapCardHeader.displayName = "MapCardHeader";
