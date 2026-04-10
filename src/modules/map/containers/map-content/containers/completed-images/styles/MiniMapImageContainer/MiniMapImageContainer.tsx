import React from "react";
import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from "../../constants";
import styles from "./MiniMapImageContainer.module.scss";

type Props = {
  isVisible?: boolean;
  isActive?: boolean;
};

export const MiniMapImageContainer = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isVisible, isActive, className, style, ...props }, ref) => {
    const classes = [styles.root, className];
    if (isVisible) classes.push(styles.visible);
    if (isActive) classes.push(styles.active);

    return (
      <div
        ref={ref}
        className={classes.filter(Boolean).join(" ")}
        style={{
          height: MINI_IMAGES_HEIGHT,
          maxHeight: MINI_IMAGES_HEIGHT,
          minHeight: MINI_IMAGES_HEIGHT,
          minWidth: MINI_IMAGES_WIDTH,
          maxWidth: MINI_IMAGES_WIDTH,
          ...style,
        }}
        {...props}
      />
    );
  },
);
MiniMapImageContainer.displayName = "MiniMapImageContainer";
