import React, { useMemo } from "react";
import { checkFilter } from "@/common/utils/checkFilters";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { navItems } from "../constants";
import { NavFilterItem } from "./NavFilterItem";

type UseMapsByFiltersNavigationProps = {
  isOpen: boolean;
};

export const useMapsByFiltersNavigation = ({ isOpen }: UseMapsByFiltersNavigationProps) => {
  const { filter, changeFilterNavigate } = useFilterQueryParams();

  const renderedItems = useMemo(
    () =>
      navItems.map(({ label, IconComponent, query }) => (
        <NavFilterItem
          key={label}
          label={label}
          IconComponent={IconComponent}
          query={query}
          isChecked={checkFilter(filter, query)}
          isOpen={isOpen}
          onSelect={changeFilterNavigate}
        />
      )),
    [filter, isOpen, changeFilterNavigate],
  );

  return { renderedItems };
};
