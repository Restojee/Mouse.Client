import React from "react";
import styles from "./MapContentSidebar.module.scss";

export const MapContentSidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
MapContentSidebar.displayName = "MapContentSidebar";
