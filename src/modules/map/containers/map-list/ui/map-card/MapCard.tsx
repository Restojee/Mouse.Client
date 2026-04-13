import React from "react";
import { Map } from "@/api/codegen/genMouseMapsApi";
import { MapCard as MapCardWrapper } from "@/modules/map/styles/MapCard/MapCard";
import { MapCardBody } from "@/modules/map/styles/MapCardBody/MapCardBody";
import { MapCardFooter } from "@/modules/map/styles/MapCardFooter/MapCardFooter";
import { MapCardHeader } from "@/modules/map/styles/MapCardHeader/MapCardHeader";
import { BookCheckIcon } from "@/svg/BookCheckIcon";
import { CommentIcon } from "@/svg/CommentIcon";
import { CopyIcon } from "@/svg/CopyIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { AppImage } from "@/ui/AppImage/AppImage";
import { IconButton } from "@/ui/Button/IconButton";
import { Typography } from "@/ui/Typography/styles/Typography";
import styles from "./MapCard.module.scss";
import { MapCardButton } from "./MapCardButton";
import { useMapCard } from "./useMapCard";

type MapCardPropsType = {
  map: Map;
};

export const MapCard = React.memo((props: MapCardPropsType) => {
  const { commentsCount, completedCount } = props.map;
  const {
    isMapHover,
    onMouseLeave,
    onMouseEnter,
    onIconsClick,
    formattedName,
    onToggleMapFavoriteHandler,
    mapImage,
    favoriteIconColor,
    onCardClick,
  } = useMapCard(props);

  return (
    <MapCardWrapper
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onCardClick}
    >
      <MapCardHeader onClick={onIconsClick}>
        <Typography>{formattedName}</Typography>
        <IconButton>
          <CopyIcon size={24} />
        </IconButton>
      </MapCardHeader>
      <MapCardBody>
        <MapCardButton
          id={props.map.id}
          isMapHover={isMapHover}
        />
        <AppImage
          image={mapImage}
          alt={props.map.name}
        />
      </MapCardBody>
      <MapCardFooter isMapHover={isMapHover}>
        <div className={styles.footerLeft}>
          <IconButton onClick={onToggleMapFavoriteHandler}>
            <FavoriteIcon color={favoriteIconColor} />
          </IconButton>
        </div>
        <div className={styles.footerRight}>
          <div
            className={styles.counter}
            title="Выполнений"
          >
            <BookCheckIcon />
            <Typography>{completedCount}</Typography>
          </div>
          <div
            className={styles.counter}
            title="Комментариев"
          >
            <CommentIcon />
            <Typography>{commentsCount}</Typography>
          </div>
        </div>
      </MapCardFooter>
    </MapCardWrapper>
  );
});

MapCard.displayName = "MapCard";
