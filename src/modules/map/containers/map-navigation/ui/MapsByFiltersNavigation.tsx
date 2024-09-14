import { checkFilter } from "@/common/utils/checkFilters";
import useQueryParams from "@/hooks/useQueryParams";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { StyledBox } from "@/ui/Box";
import { navItems } from "../constants";

type MapsByFiltersNavigationSectionProps = {
  isOpen: boolean;
};

export function MapsByFiltersNavigation(props: MapsByFiltersNavigationSectionProps) {
  const { filter, changeFilterNavigate } = useQueryParams();

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
      />
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
    </StyledBox>
  );
}
