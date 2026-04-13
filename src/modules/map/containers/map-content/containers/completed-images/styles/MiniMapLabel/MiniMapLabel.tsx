import React from "react";
import clsx from "clsx";
import styles from "./MiniMapLabel.module.scss";

type Props = {
  isActive?: boolean;
};

export const MiniMapLabel = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isActive, className, ...props }, ref) => {
    const rootClassName = clsx(styles.root, isActive && styles.active, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
MiniMapLabel.displayName = "MiniMapLabel";
