import React from "react";
import styles from "./MapsGrid.module.scss";

export const MapsGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
MapsGrid.displayName = "MapsGrid";
