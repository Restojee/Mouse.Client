import React from "react";
import clsx from "clsx";
import styles from "./MapContentPaper.module.scss";

export const MapContentPaper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
MapContentPaper.displayName = "MapContentPaper";
