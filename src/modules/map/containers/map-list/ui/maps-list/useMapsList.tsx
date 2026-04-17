import React, { CSSProperties, useCallback, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useColumnsCount } from "@/hooks/useColumnsCount";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getMapsThunk, getMoreMapsThunk, selectIsMapsFetching, selectMaps, selectMapsInfo } from "../../slice";
import { MapCard } from "../map-card/MapCard";
import { MapCardSkeleton } from "../map-card/MapCardSkeleton";
import styles from "./MapsList.module.scss";

const SKELETON_ROWS = 3;

export const useMapsList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { updateFilter } = useFilterQueryParams();

  const maps = useAppSelector(selectMaps);
  const isFetching = useAppSelector(selectIsMapsFetching);
  const mapsInfo = useAppSelector(selectMapsInfo);
  const columns = useColumnsCount();

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(getMapsThunk());
  }, [router.query.filter, router.isReady]);

  const hasMore = useMemo(() => (mapsInfo ? mapsInfo.page < mapsInfo.totalPages : false), [mapsInfo]);

  const onLoadMore = useCallback(() => {
    dispatch(getMoreMapsThunk());
  }, [dispatch]);

  const endReached = useCallback(() => {
    if (hasMore && !isFetching) onLoadMore();
  }, [hasMore, isFetching, onLoadMore]);

  const mapsCount = maps?.length ?? 0;
  const rowCount = useMemo(() => Math.ceil(mapsCount / columns), [mapsCount, columns]);

  const rowClassName = useMemo(() => clsx(styles.row, columns === 2 && styles.rowCompact), [columns]);

  const rowStyle = useMemo<CSSProperties>(() => ({ ["--maps-columns" as string]: columns }), [columns]);

  const gridClassName = useMemo(() => clsx(styles.grid, columns === 2 && styles.gridCompact), [columns]);

  const showEmpty = !maps?.length && !isFetching;
  const isInitialLoading = isFetching && !maps?.length;
  const isPaginationLoading = isFetching && Boolean(maps?.length);

  const lastRowFillCount = useMemo(() => {
    const remainder = mapsCount % columns;
    return remainder === 0 ? 0 : columns - remainder;
  }, [mapsCount, columns]);

  const itemContent = useCallback(
    (rowIndex: number) => {
      const startIdx = rowIndex * columns;
      const isLastRow = rowIndex === rowCount - 1;
      const cells = Array.from({ length: columns }, (_, col) => {
        const map = maps?.[startIdx + col];
        if (map) {
          return (
            <MapCard
              key={map.id}
              map={map}
            />
          );
        }
        if (isLastRow && isPaginationLoading) {
          return <MapCardSkeleton key={`fill-skeleton-${rowIndex}-${col}`} />;
        }
        return <div key={`empty-${col}`} />;
      });
      return (
        <div
          className={rowClassName}
          style={rowStyle}
        >
          {cells}
        </div>
      );
    },
    [maps, columns, rowClassName, rowStyle, rowCount, isPaginationLoading],
  );

  const skeletonRows = useMemo(
    () =>
      Array.from({ length: SKELETON_ROWS }, (_, rowIndex) => (
        <div
          key={`skeleton-row-${rowIndex}`}
          className={rowClassName}
          style={rowStyle}
        >
          {Array.from({ length: columns }, (__, col) => (
            <MapCardSkeleton key={`skeleton-${rowIndex}-${col}`} />
          ))}
        </div>
      )),
    [columns, rowClassName, rowStyle],
  );

  const Footer = useCallback(() => {
    if (!isPaginationLoading) return null;
    if (lastRowFillCount > 0) return null;
    return (
      <div
        className={rowClassName}
        style={rowStyle}
      >
        {Array.from({ length: columns }, (_, col) => (
          <MapCardSkeleton key={`pagination-skeleton-${col}`} />
        ))}
      </div>
    );
  }, [isPaginationLoading, lastRowFillCount, columns, rowClassName, rowStyle]);

  const virtuosoComponents = useMemo(() => ({ Footer }), [Footer]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const onPageChange = useCallback(
    async (selectedItem: { selected: number }) => {
      await updateFilter({ page: selectedItem.selected + 1 });
      scrollAreaRef.current?.scrollTo({ behavior: "smooth", top: 0 });
    },
    [updateFilter],
  );

  const currentPage = mapsInfo?.page ?? 1;

  return {
    isFetching,
    isInitialLoading,
    isPaginationLoading,
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
  };
};
