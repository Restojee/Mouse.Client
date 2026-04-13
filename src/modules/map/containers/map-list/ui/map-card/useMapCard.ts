import { Map } from "@/api/codegen/genMouseMapsApi";
import { getMapImageLink } from "@/common/utils";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useMap } from "@/modules/map/common";
import { removeNonDigits } from "@/modules/map/containers/map-list";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import React, { useCallback, useMemo, useState } from "react";

type UseMapCardProps = {
  map: Map;
};

export const useMapCard = ({ map }: UseMapCardProps) => {
  const { id, name, tags, image, isFavoriteByUser } = map;
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const [isMapHover, setIsMapHover] = useState(false);
  const { onMapNameCopy, onToggleMapFavorite } = useMap(id);
  const { openMap } = useMapView();

  const onMouseLeave = useCallback(() => setIsMapHover(false), []);
  const onMouseEnter = useCallback(() => setIsMapHover(true), []);

  const isVanilla = useMemo(() => tags?.find((el) => el.name === "Ванилла"), [tags]);

  const onIconsClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      await onMapNameCopy(isVanilla ? removeNonDigits(name) : name);
    },
    [name, onMapNameCopy, isVanilla],
  );

  const formattedName = useMemo(() => (isVanilla ? removeNonDigits(name) : name), [name, isVanilla]);

  const onToggleMapFavoriteHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleMapFavorite(Boolean(isFavoriteByUser));
    },
    [onToggleMapFavorite, isFavoriteByUser],
  );

  const mapImage = useMemo(() => getMapImageLink(image?.name, "display"), [image]);

  const favoriteIconColor = useMemo(
    () => (isFavoriteByUser ? theme.colors.brandColor : undefined),
    [isFavoriteByUser, theme.colors.brandColor],
  );

  const onCardClick = useCallback(() => {
    if (!isMobile) return;
    openMap(id);
  }, [isMobile, openMap, id]);

  return {
    isMapHover,
    onMouseLeave,
    onMouseEnter,
    onIconsClick,
    formattedName,
    onToggleMapFavoriteHandler,
    mapImage,
    favoriteIconColor,
    onCardClick,
  };
};
