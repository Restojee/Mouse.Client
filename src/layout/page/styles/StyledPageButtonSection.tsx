import React from "react";
import styles from "./Page.module.scss";

export const StyledPagePaneBlock = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.pageButtonSection, className].filter(Boolean).join(" ")} {...props} />
  ),
);
StyledPagePaneBlock.displayName = "StyledPagePaneBlock";
