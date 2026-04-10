import * as React from "react";
import { MapsByCategoryNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByCategoryNavigation";
import { MapsByFiltersNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByFiltersNavigation";
import { TagsNavigation } from "@/modules/tag/TagsNavigation";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { Display } from "@/ui/Display";
import { StyledBox } from "@/ui/Box";

/**
 * View-слой: контент навигационного drawer (без обёртки в sheet).
 * Открывается через useModal().show() из MobilePanel.
 */
export const MobileNavDrawerContent: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <StyledBox
      direction="column"
      overflow="auto"
      grow={1}
      padding="10px 5px"
      gap={10}
    >
      <MapsByCategoryNavigation isOpen />
      <Display condition={isAuth}>
        <MapsByFiltersNavigation isOpen />
      </Display>
      <StyledBox
        direction="column"
        grow={1}
      >
        <TagsNavigation
          isOpen
          noScroll
        />
      </StyledBox>
    </StyledBox>
  );
};
