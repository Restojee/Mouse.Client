import React from "react";
import styles from "./MapCardButton.module.scss";

type Props = {
  isHover?: boolean;
};

export const MapCardButton = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isHover, className, ...props }, ref) => (
    <div
      ref={ref}
      className={[styles.root, !isHover && styles.hidden, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
MapCardButton.displayName = "MapCardButton";
