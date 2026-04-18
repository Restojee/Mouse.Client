import React from "react";
import { Property } from "csstype";
import styles from "./styles/Button.module.scss";

type IconButtonPropsType = {
  opacity?: Property.Opacity;
  margin?: Property.Margin;
  padding?: Property.Padding;
  right?: Property.Right;
  // isAdmin?: boolean;
  isStylized?: boolean;
  isPanel?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonPropsType & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    { opacity, color, margin, padding, right, isStylized, isPanel, disabled, className, children, style, ...htmlProps },
    ref,
  ) => {
    const classes = [styles.iconButton, className];
    if (disabled) classes.push(styles.iconButtonDisabled);
    if (isStylized) classes.push(styles.iconButtonStylized);
    if (isPanel) classes.push(styles.iconButtonPanel);

    return (
      <button
        ref={ref}
        className={classes.filter(Boolean).join(" ")}
        style={{
          margin,
          opacity: disabled ? 0.3 : opacity || 0.7,
          padding,
          color,
          ...(right && { marginLeft: "auto" }),
          ...style,
        }}
        disabled={disabled}
        {...htmlProps}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
