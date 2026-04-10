import React from "react";
import styles from "./MiniMapCount.module.scss";

export const MiniMapCount = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
MiniMapCount.displayName = "MiniMapCount";
