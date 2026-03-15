import { checkFilter } from "@/common/utils/checkFilters";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { StyledBox } from "@/ui/Box";
import { navItems } from "../constants";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Collapse from "@/ui/Collapse/Collapse";
import { ArrowIcon } from "@/svg/ArrowIcon";

type MapsByFiltersNavigationSectionProps = {
  isOpen: boolean;
};

export function MapsByFiltersNavigation(props: MapsByFiltersNavigationSectionProps) {
  const { filter, changeFilterNavigate } = useFilterQueryParams();

  const storageKey = useMemo(() => "sidebar-my-collection-collapsed", []);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const raw = window.localStorage.getItem(storageKey);
    return raw === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, String(isCollapsed));
  }, [isCollapsed, storageKey]);

  const toggleCollapsed = useCallback(() => setIsCollapsed((v) => !v), []);

  return (
    <StyledBox
      transition="0.3s"
      margin={props.isOpen ? "0" : "-10px 0 0 0"}
      direction="column"
      gap={props.isOpen ? 5 : 10}
    >
      <SidebarSection
        label="Моя коллекция"
        isOpen={props.isOpen}
        append={
          props.isOpen ? (
            <StyledNavLinkSection
              isOpen={props.isOpen}
              onClick={toggleCollapsed}
            >
              <ArrowIcon rotate={isCollapsed ? "90deg" : "270deg"} />
            </StyledNavLinkSection>
          ) : undefined
        }
      />
      <Collapse isOpen={!isCollapsed}>
        {navItems.map(({ label, IconComponent, query }) => (
          <NavLink
            key={label}
            onClick={() => changeFilterNavigate(query)}
            label={label}
            isChecked={checkFilter(filter, query)}
            prepend={
              <StyledNavLinkSection isOpen={props.isOpen}>
                <IconComponent />
              </StyledNavLinkSection>
            }
            isOpen={props.isOpen}
          />
        ))}
      </Collapse>
    </StyledBox>
  );
}
