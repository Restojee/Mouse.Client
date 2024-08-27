import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useQueryParams from "@/hooks/useQueryParams";
import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { StyledBox } from "@/ui/Box";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { Display } from "@/ui/Display";
import { Pagination } from "@/ui/Pagination/Pagination";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getMapsThunk, selectIsMapsFetching, selectMaps, selectMapsInfo } from "../slice";
import { MapCard } from "./map-card/MapCard";

export const MapsList = React.memo(() => {
  const dispatch = useAppDispatch();

  const maps = useAppSelector(selectMaps);
  const isFetching = useAppSelector(selectIsMapsFetching);
  const mapsInfo = useAppSelector(selectMapsInfo);

  const router = useRouter();
  const { updateFilter, filter } = useQueryParams();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    dispatch(getMapsThunk());
  }, [router.query.filter, router.isReady]);

  const onPageChange = async (selectedItem: { selected: number }) => {
    await updateFilter({ page: selectedItem.selected + 1 });
    const pageContentElement = document.querySelector("#maps-page-container");
    pageContentElement?.scrollTo({ behavior: "smooth", top: 0 });
  };

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
      <Display condition={mapsInfo && mapsInfo.totalPages > 1}>
        <Pagination
          forcePage={filter.page - 1}
          pageCount={mapsInfo?.totalPages || 1}
          onPageChange={onPageChange}
        />
      </Display>
    </>
  );
});
