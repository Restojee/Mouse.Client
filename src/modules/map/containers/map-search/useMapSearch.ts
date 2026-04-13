import React, { useCallback } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useIsMobile } from "@/hooks/useIsMobile";
import { selectMaps } from "@/modules/map/containers/map-list";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";

export const useMapSearch = () => {
  const { updateFilter, filter } = useFilterQueryParams();
  const { openMap } = useMapView();
  const maps = useAppSelector(selectMaps);
  const isMobile = useIsMobile();

  const onChange = useCallback(
    async (value: string) => {
      await updateFilter({ name: value.trim(), page: 1 });
    },
    [updateFilter],
  );

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return;

      const map = maps?.find((el) => el.name === filter.name?.trim());
      if (map) {
        await openMap(map.id);
        return;
      }
      if (maps?.[0]) {
        await openMap(maps[0].id);
      }
    },
    [maps, filter.name, openMap],
  );

  return {
    value: filter.name ?? "",
    alwaysOpen: !isMobile,
    onChange,
    onKeyDown,
  };
};
