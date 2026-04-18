import { useMemo } from "react";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useMap } from "@/modules/map/common";
import { selectIsMapFetching } from "@/modules/map/containers/map-content/slice";
import { MapContentSidebarSkeleton } from "../../components/skeleton/MapContentSkeleton";
import { SidebarProfile } from "../../components/sidebar-profile/SidebarProfile";
import { SidebarIcons } from "../actions/SidebarIcons";
import { SidebarComments } from "../comments/SidebarComments";
import { useCompletedMap } from "../completed-images/hooks/useCompletedMap";

export const SidebarContent = () => {
  const { map } = useMap();
  const { activeMapCompleted } = useCompletedMap();
  const isMapFetching = useAppSelector(selectIsMapFetching);
  const isMapContentLoading = isMapFetching && !map;

  const dateTime = useMemo(() => {
    if (!map) return "";
    const dt = activeMapCompleted?.createdUtcDate || map?.createdUtcDate;
    return formatDateTime(dt);
  }, [map, activeMapCompleted?.createdUtcDate]);

  if (isMapContentLoading) {
    return <MapContentSidebarSkeleton />;
  }

  return (
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
};
