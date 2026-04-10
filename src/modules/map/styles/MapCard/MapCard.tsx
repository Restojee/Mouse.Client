import React from "react";
import styles from "./MapCard.module.scss";

export const MapCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
MapCard.displayName = "MapCard";
