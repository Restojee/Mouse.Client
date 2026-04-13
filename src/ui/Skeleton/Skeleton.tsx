import React, { CSSProperties, memo } from "react";
import clsx from "clsx";
import skeletonStyles from "./Skeleton.module.scss";

export type SkeletonVariant = "rect" | "text" | "circle";

type SkeletonProps = {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: CSSProperties;
};

export const Skeleton = memo(
  ({ variant = "rect", width, height, borderRadius, className, style }: SkeletonProps) => {
    const mergedStyle: CSSProperties = {
      width,
      height,
      ...(borderRadius !== undefined && { borderRadius }),
      ...style,
    };

    return (
      <span
        className={clsx(skeletonStyles.skeleton, skeletonStyles[variant], className)}
        style={mergedStyle}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
