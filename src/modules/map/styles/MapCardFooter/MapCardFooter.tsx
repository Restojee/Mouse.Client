import React from "react";
import clsx from "clsx";
import styles from "./MapCardFooter.module.scss";

type Props = {
  isMapHover?: boolean;
};

export const MapCardFooter = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isMapHover, className, ...props }, ref) => {
    const rootClassName = clsx(styles.root, isMapHover && styles.visible, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
MapCardFooter.displayName = "MapCardFooter";
