import React from "react";
import clsx from "clsx";
import styles from "./MapsGrid.module.scss";

export const MapsGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
MapsGrid.displayName = "MapsGrid";
