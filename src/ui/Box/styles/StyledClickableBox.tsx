import React from "react";
import { Box, BoxProps } from "@/ui/Box";
import styles from "./ClickableBox.module.scss";

type Props = Partial<BoxProps> & React.HTMLAttributes<HTMLDivElement>;

export const ClickableBox = React.forwardRef<HTMLDivElement, Props>(
  ({ className, isActive, bgColorByActive, ...props }, ref) => {
    const classes = [styles.clickableBox, className];
    if (isActive) classes.push(styles.active);

    return (
      <Box
        ref={ref}
        className={classes.filter(Boolean).join(" ")}
        style={
          isActive
            ? { backgroundColor: bgColorByActive || "var(--color-primary-light)", pointerEvents: "none" }
            : undefined
        }
        {...props}
      />
    );
  },
);

ClickableBox.displayName = "ClickableBox";
