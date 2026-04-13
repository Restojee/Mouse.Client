import clsx from "clsx";
import React from "react";
import styles from "./Page.module.scss";

export type Props = {
  top?: boolean;
  bottom?: boolean;
};
export const PagePanel = React.forwardRef<HTMLDivElement, Partial<Props> & React.HTMLAttributes<HTMLDivElement>>(
  ({ top, bottom, className, ...props }, ref) => {
    const rootClassName = clsx(
      styles.pagePanel,
      top && styles.pagePanelTop,
      bottom && styles.pagePanelBottom,
      className,
    );
    return (
      <div
        ref={ref}
        className={rootClassName}
        {...props}
      />
    );
  },
);
PagePanel.displayName = "PagePanel";
