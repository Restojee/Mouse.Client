import React from "react";
import { Virtuoso } from "react-virtuoso";
import styles from "./MapsList.module.scss";
import { useMapsList } from "./useMapsList";

const VIRTUOSO_STYLE = { height: "100%" };

export const MapsList = React.memo(() => {
  const { isInitialLoading, rowCount, itemContent, endReached, showEmpty, skeletonRows, virtuosoComponents } =
    useMapsList();

  if (showEmpty) {
    return <div className={styles.empty}>Карты не найдены</div>;
  }

  if (isInitialLoading) {
    return <div className={styles.skeletonList}>{skeletonRows}</div>;
  }

  return (
    <Virtuoso
      style={VIRTUOSO_STYLE}
      totalCount={rowCount}
      itemContent={itemContent}
      endReached={endReached}
      overscan={800}
      increaseViewportBy={400}
      defaultItemHeight={220}
      components={virtuosoComponents}
    />
  );
});

MapsList.displayName = "MapsList";
