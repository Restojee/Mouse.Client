import { useAppSelector } from "@/hooks/useAppSelector";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useIsMobile } from "@/hooks/useIsMobile";
import { selectMaps } from "@/modules/map/containers/map-list";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { CollapsibleSearch } from "@/ui/CollapsibleSearch/CollapsibleSearch";
import React from "react";

type Props = {
  onOpenChange?: (isOpen: boolean) => void;
};

export const MapSearch = ({ onOpenChange }: Props) => {
  const { updateFilter, filter } = useFilterQueryParams();
  const { openMap } = useMapView();
  const maps = useAppSelector(selectMaps);
  const isMobile = useIsMobile();

  const onChange = async (value: string) => {
    await updateFilter({ name: value.trim(), page: 1 });
  };

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const map = maps?.find((el) => el.name === filter.name?.trim());

    if (e.key !== "Enter") {
      return;
    }

    if (map) {
      await openMap(map.id);
      return;
    }

    if (maps?.[0]) {
      await openMap(maps?.[0].id);
    }
  };

  return (
    <CollapsibleSearch
      value={filter.name ?? ""}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onOpenChange={onOpenChange}
      placeholder="Поиск по номеру карты"
      alwaysOpen={!isMobile}
    />
  );
};
