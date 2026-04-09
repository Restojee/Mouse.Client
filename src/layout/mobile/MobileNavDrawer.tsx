import * as React from "react";
import { MapsByCategoryNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByCategoryNavigation";
import { MapsByFiltersNavigation } from "@/modules/map/containers/map-navigation/ui/MapsByFiltersNavigation";
import { TagsNavigation } from "@/modules/tag/TagsNavigation";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { Display } from "@/ui/Display";
import { StyledBox } from "@/ui/Box";
import { CreateTagPopup } from "@/modules/tag/components/CreateTagPopup";
import { useTag } from "@/modules/tag/hooks/useTag";
import { MobileSheet } from "@/ui/MobileSheet/MobileSheet";
import { GlobalThemes } from "@/layout/theme/constants";
import { ThemeProvider } from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const darkTheme = GlobalThemes["DARK"];

export const MobileNavDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const isAuth = useAppSelector(selectIsAuth);
  const { modalType, onCloseModal } = useTag();

  return (
    <ThemeProvider theme={darkTheme}>
      <MobileSheet
        isOpen={isOpen}
        onClose={onClose}
        zIndex={300}
        height="85dvh"
        noHeader
      >
        <StyledBox
          direction={"column"}
          overflow={"auto"}
          grow={1}
          padding={"10px 5px"}
          gap={10}
          color={darkTheme.colors.textOnPrimary}
        >
          <MapsByCategoryNavigation isOpen />
          <Display condition={isAuth}>
            <MapsByFiltersNavigation isOpen />
          </Display>
          <Display condition={isOpen}>
            <StyledBox position={"relative"}>
              <CreateTagPopup
                isVisible={modalType === "tag-create" && isAuth}
                onClose={onCloseModal}
              />
            </StyledBox>
          </Display>
          <StyledBox
            direction={"column"}
            overflow={"hidden"}
            grow={1}
          >
            <TagsNavigation isOpen />
          </StyledBox>
        </StyledBox>
      </MobileSheet>
    </ThemeProvider>
  );
};
