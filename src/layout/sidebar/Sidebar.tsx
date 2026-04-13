import * as React from "react";
import { getAppVersion } from "@/common/utils";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { Box } from "@/ui/Box";
import { Display } from "@/ui/Display";
import { Sidebar as SidebarRoot } from "@/layout/sidebar/styles/Sidebar";
import { SidebarLogo } from "@/layout/sidebar/styles/SidebarLogo";
import { SidebarSwitcher } from "@/layout/sidebar/SidebarSwitcher";
import { TagsNavigation } from "@/modules/tag/TagsNavigation";
import { MapsByFiltersNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByFiltersNavigation";
import { MapsByCategoryNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByCategoryNavigation";

const appVersion = getAppVersion();

export const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <SidebarRoot isOpen={isOpen}>
      <Box
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
      </Box>
      <Box
        direction="column"
        overflow="hidden"
        grow={1}
      >
        <TagsNavigation isOpen={isOpen} />
        <SidebarLogo isOpen={isOpen}>OnlyPlanks</SidebarLogo>
        <Box
          opacity={isOpen ? 0.6 : 0}
          textAlign="center"
          margin="5px auto 0 auto"
        >
          {appVersion}
        </Box>
      </Box>
    </SidebarRoot>
  );
};
