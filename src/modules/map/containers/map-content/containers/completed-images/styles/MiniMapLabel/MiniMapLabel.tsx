import React from "react";
import styles from "./MiniMapLabel.module.scss";

type Props = {
  isActive?: boolean;
};

export const MiniMapLabel = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isActive, className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.root, isActive && styles.active, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
MiniMapLabel.displayName = "MiniMapLabel";
