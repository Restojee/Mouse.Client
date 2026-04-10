import { formatDateTime } from "@/common/utils/formatDateTime";
import { selectAppTheme } from "@/bll/appReducer";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { GlobalThemes } from "@/layout/theme/constants";
import { useIsMobile } from "@/hooks/useIsMobile";
import { selectIsAuth } from "@/modules/auth/slice";
import { useMap } from "@/modules/map/common";
import { removeNonDigits } from "@/modules/map/containers/map-list";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { CommentFillIcon } from "@/svg/CommentFillIcon";
import { Display } from "@/ui/Display";
import { ModalCloseIcon } from "@/ui/ModalCloseIcon/ModalCloseIcon";
import { MobileSheet } from "@/ui/MobileSheet/MobileSheet";
import React, { useCallback, useMemo, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { StyledMapContentMain, StyledMapContentSidebar, StyledMapContentPaper } from "../../styles/styled";
import { SidebarProfile } from "./components/sidebar-profile/SidebarProfile";
import { SidebarIcons } from "./containers/actions/SidebarIcons";
import { SidebarComments } from "./containers/comments/SidebarComments";
import { useCompletedMap } from "./containers/completed-images/hooks/useCompletedMap";
import { MiniMapImages } from "./containers/completed-images/MiniMapImages";
import { Header } from "./containers/header/Header";
import { Preview } from "./containers/image/Preview";
import { Note } from "./containers/note/Note";
import { Tags } from "./containers/tags/Tags";

const MobileScrollArea = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
  overflowY: "auto",
  overflowX: "hidden",
  gap: 26,
  padding: "20px 10px 40px",
  color: theme.colors.textOnPrimary,
}));

const MobileSidebarButton = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 16px",
  borderRadius: 12,
  border: "none",
  backgroundColor: theme.colors.primaryAccent,
  color: theme.colors.textOnPrimary,
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  width: "100%",
  justifyContent: "center",
  transition: "opacity 0.2s",
  marginTop: "auto",
  "&:hover": { opacity: 0.8 },
}));

export const MapContent = React.memo(() => {
  const { theme } = useAppTheme();
  const appThemeKey = useAppSelector(selectAppTheme);
  const appTheme = appThemeKey ? GlobalThemes[appThemeKey] : theme;
  const { closeMap } = useMapView();
  const { map } = useMap();
  const { activeMapCompleted, changeActiveCompletedMap, selectedCompletedMaps } = useCompletedMap();
  const isAuth = useAppSelector(selectIsAuth);
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fixEventPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const isVanilla = map?.tags?.find((el) => el.name === "Ванилла");

  const dateTime = useMemo(() => {
    if (map) {
      const dateTime = activeMapCompleted?.createdUtcDate || map?.createdUtcDate;
      return formatDateTime(dateTime);
    }
    return "";
  }, [map, activeMapCompleted?.createdUtcDate]);

  const sidebarContent = (
    <>
      <SidebarIcons
        levelId={map?.id}
        favoritesCount={map?.favoritesCount}
        isCompleted={map?.isCompletedByUser}
        isFavorite={map?.isFavoriteByUser}
      />
      <SidebarComments levelId={map?.id} />
    </>
  );

  const mainContent = (
    <>
      <Header
        completeCount={map?.completedCount}
        viewCount={map?.visitsCount}
        commentsCount={map?.commentsCount}
        title={isVanilla ? removeNonDigits(map?.name) : map?.name}
      />
      <Preview
        image={map?.image}
        setActiveMapCompleted={changeActiveCompletedMap}
        images={selectedCompletedMaps}
        mapCompleted={activeMapCompleted}
      />
      <MiniMapImages />
      <Display condition={isAuth}>
        <Note />
      </Display>
      <Tags tags={map?.tags} />
      <Display condition={isMobile}>
        <MobileSidebarButton onClick={() => setIsSidebarOpen(true)}>
          <CommentFillIcon />
          Комментарии
        </MobileSidebarButton>
      </Display>
    </>
  );

  return (
    <StyledMapContentPaper onClick={fixEventPropagation}>
      {isMobile ? (
        <MobileScrollArea>{mainContent}</MobileScrollArea>
      ) : (
        <StyledMapContentMain>{mainContent}</StyledMapContentMain>
      )}
      <StyledMapContentSidebar>
        <ModalCloseIcon
          color={theme.colors.textOnSecondary}
          onClick={closeMap}
        />
        {sidebarContent}
      </StyledMapContentSidebar>
      <Display condition={isMobile}>
        <ThemeProvider theme={appTheme}>
          <MobileSheet
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            zIndex={450}
            noHeader
          >
            {sidebarContent}
          </MobileSheet>
        </ThemeProvider>
      </Display>
    </StyledMapContentPaper>
  );
});
