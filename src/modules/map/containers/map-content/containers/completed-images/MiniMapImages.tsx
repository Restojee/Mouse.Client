import React from "react";
import { CardsSwiper } from "@/ui/CardsSwiper/CardsSwiper";
import { useMiniMapImages } from "./useMiniMapImages";

export const MiniMapImages = () => {
  const { hasMaps, baseSlide, renderedSlides } = useMiniMapImages();

  if (!hasMaps) {
    return null;
  }

  return (
    <div>
      <CardsSwiper>
        {baseSlide}
        {renderedSlides}
      </CardsSwiper>
    </div>
  );
};
