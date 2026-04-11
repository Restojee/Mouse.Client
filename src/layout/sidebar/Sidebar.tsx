import * as React from "react";
import { getAppVersion } from "@/common/utils";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { StyledBox } from "@/ui/Box";
import { Display } from "@/ui/Display";
import { StyledSidebar } from "@/layout/sidebar/styles/StyledSidebar";
import { StyledSidebarLogo } from "@/layout/sidebar/styles/StyledSidebarLogo";
import { SidebarSwitcher } from "@/layout/sidebar/SidebarSwitcher";
import { TagsNavigation } from "@/modules/tag/TagsNavigation";
import { MapsByFiltersNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByFiltersNavigation";
import { MapsByCategoryNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByCategoryNavigation";

const appVersion = getAppVersion();

export const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <StyledSidebar isOpen={isOpen}>
      <StyledBox
        direction="column"
        gap={isOpen ? 20 : 10}
      >
        <SidebarSwitcher
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        <MapsByCategoryNavigation isOpen={isOpen} />
        <Display condition={isAuth}>
          <MapsByFiltersNavigation isOpen={isOpen} />
        </Display>
      </StyledBox>
      <StyledBox
        direction="column"
        overflow="hidden"
        grow={1}
      >
        <TagsNavigation isOpen={isOpen} />
        <StyledSidebarLogo isOpen={isOpen}>OnlyPlanks</StyledSidebarLogo>
        <StyledBox
          opacity={isOpen ? 0.6 : 0}
          textAlign="center"
          margin="5px auto 0 auto"
        >
          {appVersion}
        </StyledBox>
      </StyledBox>
    </StyledSidebar>
  );
};
