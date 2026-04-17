import React from "react";
import { Virtuoso } from "react-virtuoso";
import { MapCard } from "@/modules/map/containers/map-list/ui/map-card/MapCard";
import { Pagination } from "@/ui/Pagination/Pagination";
import styles from "./MapsList.module.scss";
import { useMapsList } from "./useMapsList";
import { Row } from "@/ui/Row";
import { Column } from "@/ui/Column";

const VIRTUOSO_STYLE = { height: "100%" };

export const MapsList = React.memo(() => {
  const {
    isInitialLoading,
    rowCount,
    itemContent,
    endReached,
    showEmpty,
    skeletonRows,
    virtuosoComponents,
    maps,
    gridClassName,
    rowStyle,
    mapsInfo,
    onPageChange,
    currentPage,
    isMobile,
    scrollAreaRef,
  } = useMapsList();

  if (showEmpty) {
    return <div className={styles.empty}>Карты не найдены</div>;
  }

  if (isInitialLoading) {
    return <div className={styles.skeletonList}>{skeletonRows}</div>;
  }

  if (isMobile) {
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
  }

  return (
    <Column className={styles.desktopContainer}>
      <Column
        ref={scrollAreaRef}
        className={styles.desktopScrollArea}
      >
        <div
          className={gridClassName}
          style={rowStyle}
        >
          {maps?.map((map) => (
            <MapCard
              key={map.id}
              map={map}
            />
          ))}
        </div>
        <Row className={styles.paginationFooter}>
          <Pagination
            pageCount={mapsInfo?.totalPages || 1}
            onPageChange={onPageChange}
            forcePage={currentPage - 1}
          />
        </Row>
      </Column>
    </Column>
  );
});

MapsList.displayName = "MapsList";
