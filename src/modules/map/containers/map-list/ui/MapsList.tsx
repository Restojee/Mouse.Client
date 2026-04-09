import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { StyledBox } from "@/ui/Box";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { getMapsThunk, getMoreMapsThunk, selectIsMapsFetching, selectMaps, selectMapsInfo } from "../slice";
import { MapCard } from "./map-card/MapCard";

export const MapsList = React.memo(() => {
  const dispatch = useAppDispatch();

  const maps = useAppSelector(selectMaps);
  const isFetching = useAppSelector(selectIsMapsFetching);
  const mapsInfo = useAppSelector(selectMapsInfo);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    dispatch(getMapsThunk());
  }, [router.query.filter, router.isReady]);

  const hasMore = mapsInfo ? mapsInfo.page < mapsInfo.totalPages : false;

  const onLoadMore = useCallback(() => {
    dispatch(getMoreMapsThunk());
  }, [dispatch]);

  const sentinelRef = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading: isFetching,
  });

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
      <StyledMapsGrid>
        {maps?.map((map) => (
          <MapCard
            key={map.id}
            map={map}
          />
        ))}
      </StyledMapsGrid>
      <BoxLoader isLoading={isFetching} />
      {hasMore && (
        <div
          ref={sentinelRef}
          style={{ height: 1 }}
        />
      )}
    </>
  );
});
