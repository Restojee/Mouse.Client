import React from "react";
import clsx from "clsx";
import styles from "./MapCard.module.scss";

export const MapCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
MapCard.displayName = "MapCard";
