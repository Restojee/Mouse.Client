import React, { useCallback, useMemo } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { selectIsAuth } from "@/modules/auth/slice";
import { selectIsMapFetching } from "@/modules/map/containers/map-content/slice";
import { MapContentMainSkeleton } from "./components/skeleton/MapContentSkeleton";
import { useMap } from "@/modules/map/common";
import { removeNonDigits } from "@/modules/map/containers/map-list";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { Button } from "@/ui/Button";
import { Display } from "@/ui/Display";
import { mapSidebarSheet } from "./mapContentSheets";
import { MiniMapImages } from "./containers/completed-images/MiniMapImages";
import { Header } from "./containers/header/Header";
import { Preview } from "./containers/image/Preview";
import { Note } from "./containers/note/Note";
import { Tags } from "./containers/tags/Tags";
import { useCompletedMap } from "./containers/completed-images/hooks/useCompletedMap";
import contentStyles from "./MapContent.module.scss";

export const useMapContent = () => {
  const { theme } = useAppTheme();
  const { closeMap } = useMapView();
  const { map } = useMap();
  const { changeActiveCompletedMap, selectedCompletedMaps, activeMapCompleted } = useCompletedMap();
  const isAuth = useAppSelector(selectIsAuth);
  const isMapFetching = useAppSelector(selectIsMapFetching);
  const isMapContentLoading = isMapFetching && !map;
  const isMobile = useIsMobile();

  const fixEventPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const isVanilla = useMemo(() => map?.tags?.find((el) => el.name === "Ванилла"), [map?.tags]);

  const title = useMemo(() => (isVanilla ? removeNonDigits(map?.name) : map?.name), [isVanilla, map?.name]);

  const onShowSidebarHandler = useCallback(() => {
    mapSidebarSheet.show();
  }, []);

  const mainContent = useMemo(() => {
    if (isMapContentLoading) {
      return <MapContentMainSkeleton />;
    }
    return (
      <>
        <Header
          completeCount={map?.completedCount}
          viewCount={map?.visitsCount}
          commentsCount={map?.commentsCount}
          title={title}
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
            onClick={onShowSidebarHandler}
          />
        </Display>
      </>
    );
  }, [
    isMapContentLoading,
    map?.completedCount,
    map?.visitsCount,
    map?.commentsCount,
    map?.image,
    map?.tags,
    title,
    changeActiveCompletedMap,
    selectedCompletedMaps,
    activeMapCompleted,
    isAuth,
    isMobile,
    theme.colors.primary,
    onShowSidebarHandler,
  ]);

  const closeIconColor = theme.colors.textOnSecondary;

  return {
    closeMap,
    fixEventPropagation,
    isMobile,
    mainContent,
    closeIconColor,
  };
};
