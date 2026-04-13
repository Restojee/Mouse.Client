import React from "react";
import clsx from "clsx";
import styles from "./MapContentMain.module.scss";

export const MapContentMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
MapContentMain.displayName = "MapContentMain";
