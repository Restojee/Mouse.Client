import { Map } from "@/api/codegen/genMouseMapsApi";
import { getMapImageLink } from "@/common/utils";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useMap } from "@/modules/map/common";
import { removeNonDigits } from "@/modules/map/containers/map-list";
import { MapCard as MapCardWrapper } from "@/modules/map/styles/MapCard/MapCard";
import { MapCardBody } from "@/modules/map/styles/MapCardBody/MapCardBody";
import { MapCardFooter } from "@/modules/map/styles/MapCardFooter/MapCardFooter";
import { MapCardHeader } from "@/modules/map/styles/MapCardHeader/MapCardHeader";
import { BookCheckIcon } from "@/svg/BookCheckIcon";
import { CommentIcon } from "@/svg/CommentIcon";
import { CopyIcon } from "@/svg/CopyIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { AppImage } from "@/ui/AppImage/AppImage";
import { StyledBox } from "@/ui/Box";
import { IconButton } from "@/ui/Button/IconButton";
import { Typography } from "@/ui/Typography/styles/Typography";
import React, { useCallback, useMemo, useState } from "react";
import { MapCardButton } from "./MapCardButton";

type MapCardProps = {
  map: Map;
};
export const MapCard = React.memo((props: MapCardProps) => {
  const { id, name, tags, image, commentsCount, completedCount, isFavoriteByUser } = props.map;

  const { theme } = useAppTheme();

  const [isMapHover, setIsMapHover] = useState(false);

  const { onMapNameCopy, onToggleMapFavorite } = useMap(id);

  const onIconsClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const isVanilla = tags?.find((el) => el.name === "Ванилла");

      if (name && isVanilla) {
        await onMapNameCopy(removeNonDigits(name));
        return;
      }

      await onMapNameCopy(name);
    },
    [name, onMapNameCopy, tags],
  );

  const formattedName = useMemo(() => {
    const isVanilla = tags?.find((el) => el.name === "Ванилла");

    return isVanilla ? removeNonDigits(name) : name;
  }, [name, tags]);

  const onToggleMapFavoriteHandler = useCallback(() => {
    onToggleMapFavorite(Boolean(isFavoriteByUser));
  }, [onToggleMapFavorite, isFavoriteByUser]);

  const mapImage = useMemo(() => getMapImageLink(image?.name, "thumb"), [image]);

  return (
    <MapCardWrapper
      onMouseLeave={() => setIsMapHover(false)}
      onMouseEnter={() => setIsMapHover(true)}
    >
      <MapCardHeader onClick={onIconsClick}>
        <Typography>{formattedName}</Typography>
        <IconButton>
          <CopyIcon size={24} />
        </IconButton>
      </MapCardHeader>
      <MapCardBody>
        <MapCardButton
          id={id}
          isMapHover={isMapHover}
        />
        <AppImage
          image={mapImage}
          alt={name}
        />
      </MapCardBody>
      <MapCardFooter isMapHover={isMapHover}>
        <StyledBox
          gap={"10px"}
          justify="flex-start"
        >
          <IconButton onClick={onToggleMapFavoriteHandler}>
            <FavoriteIcon color={isFavoriteByUser ? theme.colors.brandColor : undefined} />
          </IconButton>
        </StyledBox>
        <StyledBox
          gap={"10px"}
          justify="flex-end"
          opacity="0.6"
        >
          <StyledBox
            gap="5px"
            align="center"
            title="Выполнений"
          >
            <BookCheckIcon />
            <Typography>{completedCount}</Typography>
          </StyledBox>
          <StyledBox
            gap="5px"
            align="center"
            title="Комментариев"
          >
            <CommentIcon />
            <Typography>{commentsCount}</Typography>
          </StyledBox>
        </StyledBox>
      </MapCardFooter>
    </MapCardWrapper>
  );
});
