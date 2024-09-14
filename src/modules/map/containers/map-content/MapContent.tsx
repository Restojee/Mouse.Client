import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectIsAuth } from "@/modules/auth/slice";
import { useMap } from "@/modules/map/common";
import { removeNonDigits } from "@/modules/map/containers/map-list";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { Display } from "@/ui/Display";
import { ModalCloseIcon } from "@/ui/ModalCloseIcon/ModalCloseIcon";
import { Paper } from "@/ui/Paper";
import React, { useCallback, useMemo } from "react";
import { StyledMapContentMain, StyledMapContentSidebar } from "../../styles/styled";
import { SidebarProfile } from "./components/sidebar-profile/SidebarProfile";
import { SidebarIcons } from "./containers/actions/SidebarIcons";
import { SidebarComments } from "./containers/comments/SidebarComments";
import { useCompletedMap } from "./containers/completed-images/hooks/useCompletedMap";
import { MiniMapImages } from "./containers/completed-images/MiniMapImages";
import { Header } from "./containers/header/Header";
import { Preview } from "./containers/image/Preview";
import { Note } from "./containers/note/Note";
import { Tags } from "./containers/tags/Tags";

export const MapContent = React.memo(() => {
  const { theme } = useAppTheme();
  const { closeMap } = useMapView();
  const { map } = useMap();
  const { activeMapCompleted } = useCompletedMap();
  const isAuth = useAppSelector(selectIsAuth);

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
  }, [map?.createdUtcDate, activeMapCompleted?.createdUtcDate]);

  return (
    <Paper
      onClick={fixEventPropagation}
      align={"flex-start"}
      padding={0}
      bgColor={theme.colors.primary}
      direction={window.innerWidth > 760 ? "row" : "column"}
      maxWidth={1200}
      overflow={"auto"}
    >
      <StyledMapContentMain>
        <Header
          completeCount={map?.completedCount}
          viewCount={map?.visitsCount}
          commentsCount={map?.commentsCount}
          title={isVanilla ? removeNonDigits(map?.name) : map?.name}
        />
        <Preview image={activeMapCompleted?.image || map?.image} />
        <MiniMapImages />
        <Display condition={isAuth}>
          <Note />
        </Display>
        <Tags tags={map?.tags} />
      </StyledMapContentMain>
      <StyledMapContentSidebar>
        <ModalCloseIcon
          color={theme.colors.textOnSecondary}
          onClick={closeMap}
        />
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
      </StyledMapContentSidebar>
    </Paper>
  );
});
