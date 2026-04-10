import React from "react";
import styles from "./ImageActionsContainer.module.scss";

export const ImageActionsContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
  ),
);
ImageActionsContainer.displayName = "ImageActionsContainer";
