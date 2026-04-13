import React from "react";
import clsx from "clsx";
import styles from "./ImageActionsContainer.module.scss";

export const ImageActionsContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const rootClassName = clsx(styles.root, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
ImageActionsContainer.displayName = "ImageActionsContainer";
