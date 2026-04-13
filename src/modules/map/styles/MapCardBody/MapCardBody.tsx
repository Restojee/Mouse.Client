import React from "react";
import clsx from "clsx";
import styles from "./MapCardBody.module.scss";

export const MapCardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
MapCardBody.displayName = "MapCardBody";
