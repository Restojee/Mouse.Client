import { useAppSelector } from "@/hooks/useAppSelector";
import useQueryParams from "@/hooks/useQueryParams";
import { selectMaps } from "@/modules/map/containers/map-list";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { SearchIcon } from "@/svg/SearchIcon";
import { StyledBox } from "@/ui/Box";
import { Input } from "@/ui/Input";
import React from "react";

export const MapSearch = () => {
  const { updateFilter, filter } = useQueryParams();
  const { openMap } = useMapView();
  const maps = useAppSelector(selectMaps);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updateFilter({ name: e.currentTarget.value, page: 1 });
  };

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const map = maps?.find(el => el.name === filter.name);

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
    <StyledBox align={"center"} gap={15}>
      <Input
        onKeyDown={onKeyDown}
        inputPrepend={<SearchIcon/>}
        width={240}
        value={filter.name}
        onChange={onChange}
        placeholder={"Поиск по номеру карты "}
      />
    </StyledBox>
  );
};

