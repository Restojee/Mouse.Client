import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { MapsGrid } from "@/modules/map/styles/MapsGrid/MapsGrid";
import { StyledBox } from "@/ui/Box";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef } from "react";
import { getMapsThunk, getMoreMapsThunk, selectIsMapsFetching, selectMaps, selectMapsInfo } from "../slice";
import { MapCard } from "./map-card/MapCard";

const getScrollRoot = (): Element | null => {
  // On desktop scroll lives inside #maps-page-container (overflow:auto).
  // On mobile StyledWrapper is the scroller — its id is not set,
  // so we fall back to null (viewport-based observation).
  const el = document.getElementById("maps-page-container");
  if (!el) return null;
  const { overflowY } = window.getComputedStyle(el);
  const isScrollable = overflowY === "auto" || overflowY === "scroll";
  return isScrollable && el.scrollHeight > el.clientHeight ? el : null;
};

export const MapsList = React.memo(() => {
  const dispatch = useAppDispatch();

  const maps = useAppSelector(selectMaps);
  const isFetching = useAppSelector(selectIsMapsFetching);
  const mapsInfo = useAppSelector(selectMapsInfo);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(getMapsThunk());
  }, [router.query.filter, router.isReady]);

  const hasMore = mapsInfo ? mapsInfo.page < mapsInfo.totalPages : false;
  const hasMoreRef = useRef(hasMore);
  hasMoreRef.current = hasMore;

  const loadMore = useCallback(() => {
    if (isFetchingRef.current || !hasMoreRef.current) return;
    dispatch(getMoreMapsThunk());
  }, [dispatch]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { root: getScrollRoot(), threshold: 0.1, rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  if (!maps?.length && !isFetching) {
    return (
      <StyledBox
        position={"relative"}
        align={"center"}
        justify={"center"}
        height={"100%"}
        margin={"auto"}
        opacity={0.5}
      >
        {"Карты не найдены"}
      </StyledBox>
    );
  }

  return (
    <>
      <MapsGrid>
        {maps?.map((map) => (
          <MapCard
            key={map.id}
            map={map}
          />
        ))}
      </MapsGrid>
      <BoxLoader isLoading={isFetching} />
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </>
  );
});
