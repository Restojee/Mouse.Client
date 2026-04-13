import React from "react";
import clsx from "clsx";
import styles from "./MiniMapCount.module.scss";

export const MiniMapCount = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
MiniMapCount.displayName = "MiniMapCount";
