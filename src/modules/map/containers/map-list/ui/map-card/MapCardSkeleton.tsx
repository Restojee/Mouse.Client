import React, { memo } from "react";
import skeletonStyles from "./MapCardSkeleton.module.scss";

export const MapCardSkeleton = memo(() => {
  return <div className={skeletonStyles.card} />;
});

MapCardSkeleton.displayName = "MapCardSkeleton";
