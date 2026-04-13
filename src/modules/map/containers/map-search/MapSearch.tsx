import React from "react";
import { CollapsibleSearch } from "@/ui/CollapsibleSearch/CollapsibleSearch";
import { useMapSearch } from "./useMapSearch";

type MapSearchPropsType = {
  onOpenChange?: (isOpen: boolean) => void;
};

export const MapSearch = ({ onOpenChange }: MapSearchPropsType) => {
  const { value, alwaysOpen, onChange, onKeyDown } = useMapSearch();

  return (
    <CollapsibleSearch
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onOpenChange={onOpenChange}
      placeholder="Поиск по номеру карты"
      alwaysOpen={alwaysOpen}
    />
  );
};
