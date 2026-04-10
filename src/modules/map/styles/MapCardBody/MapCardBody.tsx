import React from "react";
import styles from "./MapCardBody.module.scss";

export const MapCardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
MapCardBody.displayName = "MapCardBody";
