import React from "react";
import clsx from "clsx";
import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from "../../constants";
import styles from "./MiniMapImageContainer.module.scss";

type Props = {
  isVisible?: boolean;
  isActive?: boolean;
};

export const MiniMapImageContainer = React.forwardRef<HTMLDivElement, Props & React.HTMLAttributes<HTMLDivElement>>(
  ({ isVisible, isActive, className, style, ...props }, ref) => {
    const rootClassName = clsx(styles.root, isVisible && styles.visible, isActive && styles.active, className);
    const rootStyle = {
      height: MINI_IMAGES_HEIGHT,
      maxHeight: MINI_IMAGES_HEIGHT,
      minHeight: MINI_IMAGES_HEIGHT,
      minWidth: MINI_IMAGES_WIDTH,
      maxWidth: MINI_IMAGES_WIDTH,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={rootClassName}
        style={rootStyle}
        {...props}
      />
    );
  },
);
MiniMapImageContainer.displayName = "MiniMapImageContainer";
