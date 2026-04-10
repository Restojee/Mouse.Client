import React from "react";
import styles from "./MapContentPaper.module.scss";

export const MapContentPaper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
MapContentPaper.displayName = "MapContentPaper";
