import React from "react";
import styles from "./MapContentMain.module.scss";

export const MapContentMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
MapContentMain.displayName = "MapContentMain";
