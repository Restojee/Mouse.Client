import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectIsAdmin, selectIsAuth } from "@/modules/auth/slice";
import { useMap } from "@/modules/map/common";
import { toggleMapFavoriteThunk } from "@/modules/map/containers/map-content/slice";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { Map } from "@/api/codegen/genMouseMapsApi";
import { SvgIconPropsType } from "@/svg/common/types";
import { useImageUploadSheet } from "@/ui/ImageUploadModal/useImageUploadSheet";
import { useCallback, useMemo } from "react";
import { useCompletedMap } from "../completed-images/hooks/useCompletedMap";

type UseSidebarIconsProps = {
  levelId: Map["id"];
  isFavorite?: boolean;
  isCompleted?: boolean;
};

export const useSidebarIcons = ({ levelId: levelIdProp, isFavorite, isCompleted }: UseSidebarIconsProps) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppTheme();
  const isAuth = useAppSelector(selectIsAuth);
  const isAdmin = useAppSelector(selectIsAdmin);
  const { levelId: routeLevelId } = useMapView();

  const levelId = levelIdProp || routeLevelId;

  const { onMapShare, onMapDelete } = useMap(levelId);
  const { addCompletedMap } = useCompletedMap(levelId);

  const openImageSheet = useImageUploadSheet();

  const iconsProps = useMemo<SvgIconPropsType>(
    () => ({ size: 30, color: theme.colors.textOnSecondary }),
    [theme.colors.textOnSecondary],
  );

  const completedIconColor = useMemo(
    () => (isCompleted ? theme.colors.brandColor : iconsProps.color),
    [isCompleted, theme.colors.brandColor, iconsProps.color],
  );

  const favoriteIconColor = useMemo(
    () => (isFavorite ? theme.colors.brandColor : iconsProps.color),
    [isFavorite, theme.colors.brandColor, iconsProps.color],
  );

  const isDeleteDisabled = !isAuth || !isAdmin;

  const onToggleMapFavoriteHandler = useCallback(() => {
    dispatch(toggleMapFavoriteThunk({ levelId, isFavorite: Boolean(isFavorite) }));
  }, [dispatch, levelId, isFavorite]);

  const onCompletedMapModalOpen = useCallback(() => {
    openImageSheet("Добавить свою постройку", async (image) => await addCompletedMap(levelId, image));
  }, [openImageSheet, addCompletedMap, levelId]);

  return {
    isAuth,
    isDeleteDisabled,
    iconsProps,
    completedIconColor,
    favoriteIconColor,
    onCompletedMapModalOpen,
    onToggleMapFavoriteHandler,
    onMapShare,
    onMapDelete,
  };
};
