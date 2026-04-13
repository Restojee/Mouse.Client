import clsx from "clsx";
import React from "react";
import styles from "./Page.module.scss";

export const PagePanelButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, disabled, ...props }, ref) => {
    const rootClassName = clsx(styles.pagePanelButton, disabled && styles.pagePanelButtonDisabled, className);
    return (
      <button
        ref={ref}
        className={rootClassName}
        disabled={disabled}
        {...props}
      />
    );
  },
);
PagePanelButton.displayName = "PagePanelButton";
