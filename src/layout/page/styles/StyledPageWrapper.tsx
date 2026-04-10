import React from "react";
import styles from "./Page.module.scss";

export const StyledPageWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.pageWrapper, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledPageWrapper.displayName = "StyledPageWrapper";
