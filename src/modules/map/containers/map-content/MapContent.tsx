import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { selectIsAuth } from "@/modules/auth/slice";
import { useMap } from "@/modules/map/common";
import { removeNonDigits } from "@/modules/map/containers/map-list";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { Display } from "@/ui/Display";
import { ModalCloseIcon } from "@/ui/ModalCloseIcon/ModalCloseIcon";
import { useSheet } from "@/ui/Sheet";
import React, { useCallback, useMemo } from "react";
import { MapContentMain } from "../../styles/MapContentMain/MapContentMain";
import { MapContentPaper } from "../../styles/MapContentPaper/MapContentPaper";
import { MapContentSidebar } from "../../styles/MapContentSidebar/MapContentSidebar";
import contentStyles from "./MapContent.module.scss";
import { SidebarProfile } from "./components/sidebar-profile/SidebarProfile";
import { SidebarIcons } from "./containers/actions/SidebarIcons";
import { SidebarComments } from "./containers/comments/SidebarComments";
import { useCompletedMap } from "./containers/completed-images/hooks/useCompletedMap";
import { MiniMapImages } from "./containers/completed-images/MiniMapImages";
import { Header } from "./containers/header/Header";
import { Preview } from "./containers/image/Preview";
import { Note } from "./containers/note/Note";
import { Tags } from "./containers/tags/Tags";
import { Button } from "@/ui/Button";

export const MapContent = React.memo(() => {
  const { theme } = useAppTheme();
  const { closeMap } = useMapView();
  const { map } = useMap();
  const { activeMapCompleted, changeActiveCompletedMap, selectedCompletedMaps } = useCompletedMap();
  const isAuth = useAppSelector(selectIsAuth);
  const isMobile = useIsMobile();
  const sheet = useSheet();

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
      <SidebarProfile
        user={activeMapCompleted?.user || map?.user}
        date={dateTime}
      />
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
        <Button
          label="Комментарии"
          bgColor={theme.colors.primary}
          width="100%"
          className={contentStyles.mobileSidebarButton}
          onClick={() =>
            sheet.show(sidebarContent, {
              noHeader: true,
              zIndex: 450,
              withoutButtons: true,
              withoutTitle: true,
              height: 600,
            })
          }
        />
      </Display>
    </>
  );

  return (
    <MapContentPaper onClick={fixEventPropagation}>
      {isMobile ? (
        <div className={contentStyles.mobileScrollArea}>{mainContent}</div>
      ) : (
        <MapContentMain>{mainContent}</MapContentMain>
      )}
      <MapContentSidebar>
        <ModalCloseIcon
          color={theme.colors.textOnSecondary}
          onClick={closeMap}
        />
        {sidebarContent}
      </MapContentSidebar>
    </MapContentPaper>
  );
});
