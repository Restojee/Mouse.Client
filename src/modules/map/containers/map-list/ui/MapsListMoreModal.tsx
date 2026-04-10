import { GetMapsApiArg, Map } from "@/api/codegen/genMouseMapsApi";
import { mapsApi } from "@/api/mapsApi";
import { MapsGrid } from "@/modules/map/styles/MapsGrid/MapsGrid";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapCard } from "./map-card/MapCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useSheet } from "@/ui/Sheet";

type Props = {
  filter: GetMapsApiArg;
  zIndex?: number;
};

const MapsListContent: React.FC<{ filter: GetMapsApiArg }> = ({ filter }) => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMore = page < totalPages;

  const loadPage = useCallback(
    async (pageNum: number) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const data = await mapsApi.getMaps({ ...filter, page: pageNum });
        setMaps((prev) => (pageNum === 1 ? data.records : [...prev, ...data.records]));
        setPage(data.page);
        setTotalPages(data.totalPages);
      } finally {
        setIsLoading(false);
      }
    },
    [filter, isLoading],
  );

  useEffect(() => {
    loadPage(1);
  }, []);

  const onLoadMore = useCallback(() => {
    if (!isLoading && hasMore) loadPage(page + 1);
  }, [isLoading, hasMore, loadPage, page]);

  const sentinelRef = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading,
    rootRef: scrollRef,
  });

  return (
    <div
      ref={scrollRef}
      style={{ flex: 1, overflowY: "auto", padding: "0 8px 16px" }}
    >
      <StyledMapsGrid>
        {maps.map((map) => (
          <MapCard
            key={map.id}
            map={map}
          />
        ))}
      </StyledMapsGrid>
      <BoxLoader isLoading={isLoading} />
      {hasMore && (
        <div
          ref={sentinelRef}
          style={{ height: 1 }}
        />
      )}
    </div>
  );
};

/**
 * Хук для открытия модалки со списком карт.
 */
export const useShowMapsListMore = () => {
  const sheet = useSheet();

  return useCallback(
    (filter: GetMapsApiArg, options?: { zIndex?: number }) => {
      return sheet.show(<MapsListContent filter={filter} />, {
        title: "Все карты",
        height: "92dvh",
        zIndex: options?.zIndex,
        withoutButtons: true,
      });
    },
    [sheet],
  );
};
