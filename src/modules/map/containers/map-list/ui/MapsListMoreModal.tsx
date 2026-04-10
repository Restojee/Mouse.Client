import { GetMapsApiArg, Map } from "@/api/codegen/genMouseMapsApi";
import { mapsApi } from "@/api/mapsApi";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { MobileSheet } from "@/ui/MobileSheet/MobileSheet";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MapCard } from "./map-card/MapCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filter: GetMapsApiArg;
  zIndex?: number;
};

export const MapsListMoreModal: React.FC<Props> = ({ isOpen, onClose, filter, zIndex }) => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { openMap } = useMapView();

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
    if (isOpen) {
      setMaps([]);
      setPage(1);
      setTotalPages(1);
      loadPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
    <MobileSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Все карты"
      zIndex={zIndex}
      height="92dvh"
    >
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
    </MobileSheet>
  );
};
