import React from "react";
import styles from "./Page.module.scss";

export const StyledPage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.page, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledPage.displayName = "StyledPage";
