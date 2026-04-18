import { useCallback, useMemo } from "react";
import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppTheme } from "@/hooks/useAppTheme";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { useUser } from "@/modules/user/hooks/useUser";
import { getStarsByUserId } from "@/modules/user/utils/getStarsByUserId";

type UseUserModalProps = {
  onClose?: () => void;
};

export const useUserModal = ({ onClose }: UseUserModalProps) => {
  const { currentUserView, users } = useUser();
  const { theme } = useAppTheme();
  const { closeMap, levelId } = useMapView();
  const { changeFilterNavigate } = useFilterQueryParams();
  const isMobile = useIsMobile();

  const starsCount = useMemo(
    () => getStarsByUserId(currentUserView?.id, users),
    [currentUserView?.id, users],
  );

  const onFilterClick = useCallback(
    async (filter: Partial<GetMapsApiArg>) => {
      await changeFilterNavigate(filter);
      onClose?.();
      if (levelId) {
        await closeMap();
      }
    },
    [changeFilterNavigate, onClose, levelId, closeMap],
  );

  const avatarImage = useMemo(
    () => getAvatarImageLink(currentUserView?.avatar, "display"),
    [currentUserView?.avatar],
  );

  const registrationDateFull = useMemo(
    () => formatDateTime(currentUserView?.createdUtcDate),
    [currentUserView?.createdUtcDate],
  );

  const registrationDateShort = useMemo(
    () => formatDateTime(currentUserView?.createdUtcDate, true),
    [currentUserView?.createdUtcDate],
  );

  return {
    currentUserView,
    starsCount,
    avatarImage,
    registrationDateFull,
    registrationDateShort,
    closeButtonColor: theme.colors.brandColorContrastText,
    onFilterClick,
    isMobile,
  };
};
