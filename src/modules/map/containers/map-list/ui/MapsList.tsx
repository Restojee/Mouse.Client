import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useIsMobile } from "@/hooks/useIsMobile";
import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { StyledBox } from "@/ui/Box";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { Button } from "@/ui/Button";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { getMapsThunk, selectFilter, selectIsMapsFetching, selectMaps, selectMapsInfo } from "../slice";
import { MapCard } from "./map-card/MapCard";
import { MapsListMoreModal } from "./MapsListMoreModal";

export const MapsList = React.memo(() => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const maps = useAppSelector(selectMaps);
  const isFetching = useAppSelector(selectIsMapsFetching);
  const mapsInfo = useAppSelector(selectMapsInfo);
  const filter = useAppSelector(selectFilter);

  const [moreOpen, setMoreOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(getMapsThunk());
  }, [router.query.filter, router.isReady]);

  const hasMore = mapsInfo ? mapsInfo.page < mapsInfo.totalPages : false;
  const remaining = mapsInfo ? mapsInfo.totalItems - (maps?.length ?? 0) : 0;

  const onLoadMore = useCallback(() => {
    setMoreOpen(true);
  }, []);

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
        <StyledBox
          justify="center"
          padding="12px 0 4px"
        >
          <Button
            onClick={onLoadMore}
            label={`Ещё ${remaining > 0 ? remaining : ""}`}
            size="sm"
          />
        </StyledBox>
      )}
      {isMobile && (
        <MapsListMoreModal
          isOpen={moreOpen}
          onClose={() => setMoreOpen(false)}
          filter={filter}
        />
      )}
    </>
  );
});
