import React from "react";
import styles from "./Page.module.scss";

export const StyledPagePanelButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, disabled, ...props }, ref) => {
    const classes = [styles.pagePanelButton, className];
    if (disabled) classes.push(styles.pagePanelButtonDisabled);
    return <button ref={ref} className={classes.filter(Boolean).join(" ")} disabled={disabled} {...props} />;
  },
);
StyledPagePanelButton.displayName = "StyledPagePanelButton";
