import React from "react";
import styles from "./MapCardFooter.module.scss";

type Props = {
  isMapHover?: boolean;
};

export const MapCardFooter = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isMapHover, className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.root, isMapHover && styles.visible, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
MapCardFooter.displayName = "MapCardFooter";
