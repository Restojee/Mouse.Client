import React, { useCallback } from "react";
import { SwiperSlide } from "swiper/react";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { MiniMapImageContainer } from "./styles/MiniMapImageContainer/MiniMapImageContainer";
import { MiniMapLabel } from "./styles/MiniMapLabel/MiniMapLabel";
import { MiniMapCount } from "./styles/MiniMapCount/MiniMapCount";
import { Display } from "@/ui/Display";
import { getMapImageLink } from "@/common/utils";
import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from "./constants";
import { useCompletedMap } from "./hooks/useCompletedMap";
import styles from "./MiniMapImages.module.scss";

export const useMiniMapImages = () => {
  const { levelId } = useMapView();
  const { maps, onMapClick, activeMapCompleted } = useCompletedMap(levelId);

  const isMapActive = !activeMapCompleted;
  const activeUserId = activeMapCompleted?.user.id;

  const onResetMapClick = useCallback(() => {
    onMapClick(null);
  }, [onMapClick]);

  const renderedSlides = maps?.map((item) => (
    <SwiperSlide
      key={item.id}
      className={styles.slide}
    >
      <MiniMapImageContainer
        onClick={() => onMapClick(item)}
        isActive={activeUserId === item.user.id}
        isVisible
      >
        <MiniMapLabel isActive={activeUserId === item.user.id}>{item.user.username}</MiniMapLabel>
        <Display condition={Boolean(item.count && item.count > 1)}>
          <MiniMapCount>{item.count}</MiniMapCount>
        </Display>
        <img
          alt={item.user?.username}
          src={getMapImageLink(item?.image?.name, "display")}
          height={MINI_IMAGES_HEIGHT}
          width={MINI_IMAGES_WIDTH}
        />
      </MiniMapImageContainer>
    </SwiperSlide>
  ));

  const baseSlide = (
    <SwiperSlide className={styles.slide}>
      <MiniMapImageContainer
        onClick={onResetMapClick}
        isActive={isMapActive}
      >
        Карта
      </MiniMapImageContainer>
    </SwiperSlide>
  );

  return {
    hasMaps: Boolean(maps),
    baseSlide,
    renderedSlides,
  };
};
