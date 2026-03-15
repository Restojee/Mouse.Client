import { getMapImageLink } from "@/common/utils";
import { useMapView } from "@/modules/map/containers/map-view-modal/hooks/useMapView";
import { StyledBox } from "@/ui/Box";
import Image from "next/image";
import React from "react";
import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from "./constants";
import { useCompletedMap } from "./hooks/useCompletedMap";
import { StyledMiniMapCount, StyledMiniMapImageContainer, StyledMiniMapLabel } from "./styles";
import { CardsSwiper } from "@/ui/CardsSwiper/CardsSwiper";
import { SwiperSlide } from "swiper/react";
import { Display } from "@/ui/Display";

export const MiniMapImages = () => {
  const { levelId } = useMapView();

  const { maps, onMapClick, activeMapCompleted } = useCompletedMap(levelId);

  if (!maps) {
    return null;
  }

  return (
    <StyledBox>
      <CardsSwiper>
        <SwiperSlide style={{ width: "auto" }}>
          <StyledMiniMapImageContainer
            onClick={() => onMapClick(null)}
            isActive={!activeMapCompleted}
          >
            Карта
          </StyledMiniMapImageContainer>
        </SwiperSlide>

        {maps?.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{ width: "auto" }}
          >
            <StyledMiniMapImageContainer
              key={item.createdUtcDate}
              onClick={() => onMapClick(item)}
              isActive={activeMapCompleted?.user.id === item.user.id}
              isVisible
            >
              <StyledMiniMapLabel isActive={activeMapCompleted?.user.id === item.user.id}>
                {item.user.username}
              </StyledMiniMapLabel>
              <Display condition={item.count && item.count > 1}>
                <StyledMiniMapCount>{item.count}</StyledMiniMapCount>
              </Display>
              <Image
                alt={item.user?.username}
                src={getMapImageLink(item?.image)}
                height={MINI_IMAGES_HEIGHT}
                width={MINI_IMAGES_WIDTH}
                objectPosition={"center"}
                objectFit={"cover"}
              />
            </StyledMiniMapImageContainer>
          </SwiperSlide>
        ))}
      </CardsSwiper>
    </StyledBox>
  );
};
