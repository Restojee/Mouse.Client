import React from "react";
import styles from "./Page.module.scss";

export type Props = {
  top?: boolean;
  bottom?: boolean;
};
export const StyledPagePanel = React.forwardRef<HTMLDivElement, Partial<Props> & React.HTMLAttributes<HTMLDivElement>>(
  ({ top, bottom, className, ...props }, ref) => {
    const classes = [styles.pagePanel, className];
    if (top) classes.push(styles.pagePanelTop);
    if (bottom) classes.push(styles.pagePanelBottom);
    return <div ref={ref} className={classes.filter(Boolean).join(" ")} {...props} />;
  },
);
StyledPagePanel.displayName = "StyledPagePanel";
