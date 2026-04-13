import React from "react";
import clsx from "clsx";
import styles from "./MapCardButton.module.scss";

type Props = {
  isHover?: boolean;
};

export const MapCardButton = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isHover, className, ...props }, ref) => {
    const rootClassName = clsx(styles.root, !isHover && styles.hidden, className);
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
MapCardButton.displayName = "MapCardButton";
