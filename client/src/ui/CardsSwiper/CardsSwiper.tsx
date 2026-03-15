import { Swiper } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import { ReactNode } from "react";
import { CardSliderNavArrow, CardSliderWrapper } from "@/ui/CardsSwiper/styles";
import { ExpandRightIcon } from "@/svg/ExpandRightIcon";
import { ExpandLeftIcon } from "@/svg/ExpandLeftIcon";

interface Props {
  children: ReactNode;
}

export const CardsSwiper = (props: Props) => {
  const slidePrevClass = `card-slider-nav-arrow-prev`;
  const slideNextClass = `card-slider-nav-arrow-next`;

  return (
    <CardSliderWrapper>
      <Swiper
        centeredSlides={false}
        navigation={{
          prevEl: `.${slidePrevClass}`,
          nextEl: `.${slideNextClass}`,
        }}
        modules={[Navigation]}
        slidesPerView={"auto"}
        spaceBetween={10}
      >
        {props.children}
      </Swiper>
      <CardSliderNavArrow
        className={slideNextClass}
        isNext
      >
        <ExpandRightIcon />
      </CardSliderNavArrow>
      <CardSliderNavArrow
        className={slidePrevClass}
        isPrev
      >
        <ExpandLeftIcon />
      </CardSliderNavArrow>
    </CardSliderWrapper>
  );
};
