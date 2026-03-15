import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { WidgetIcon } from "@/svg/WidgetIcon";
import { StyledBox } from "@/ui/Box";
import React from "react";
import { useMapNavigation } from "../hooks/useMapNavigation";

type MapsByCategoryNavigationSectionProps = {
  isOpen: boolean;
};
export const MapsByCategoryNavigation = React.memo((props: MapsByCategoryNavigationSectionProps) => {
  const { filters, navigateTo } = useMapNavigation();

  return (
    <StyledBox
      transition="0.3s"
      direction="column"
      gap={props.isOpen ? 5 : 10}
    >
      <SidebarSection
        label="Общие разделы"
        isOpen={props.isOpen}
      />
      <NavLink
        onClick={() => navigateTo({})}
        isChecked={Object.entries(filters).length < 4}
        label="Все карты"
        prepend={
          <StyledNavLinkSection isOpen={props.isOpen}>
            <WidgetIcon />
          </StyledNavLinkSection>
        }
        isOpen={props.isOpen}
      />
    </StyledBox>
  );
});
