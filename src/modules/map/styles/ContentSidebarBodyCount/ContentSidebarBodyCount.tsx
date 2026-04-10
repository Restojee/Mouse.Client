import React from "react";
import styles from "./ContentSidebarBodyCount.module.scss";

export const ContentSidebarBodyCount = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
ContentSidebarBodyCount.displayName = "ContentSidebarBodyCount";
