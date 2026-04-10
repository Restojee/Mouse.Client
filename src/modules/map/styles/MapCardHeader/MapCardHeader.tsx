import React from "react";
import styles from "./MapCardHeader.module.scss";

export const MapCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
MapCardHeader.displayName = "MapCardHeader";
