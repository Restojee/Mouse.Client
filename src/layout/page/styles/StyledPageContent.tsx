import React from "react";
import styles from "./Page.module.scss";

export const StyledPageContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.pageContent, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledPageContent.displayName = "StyledPageContent";
