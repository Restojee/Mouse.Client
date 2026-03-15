import { Swiper, SwiperProps } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";
import { ReactNode } from "react";
import { CardSliderNavArrow, CardSliderWrapper } from "./styles";
import { ExpandRightIcon } from "@/svg/ExpandRightIcon";
import { ExpandLeftIcon } from "@/svg/ExpandLeftIcon";

interface Props extends SwiperProps {
  children: ReactNode;
}

export const ImagesSwiper = ({ children, ...swiperProps }: Props) => {
  const slidePrevClass = `images-slider-nav-arrow-prev`;
  const slideNextClass = `images-slider-nav-arrow-next`;

  return (
    <CardSliderWrapper
      width={"100%"}
      align={"center"}
      height={"max-content"}
      position={"relative"}
    >
      <Swiper
        spaceBetween={10}
        navigation={{
          prevEl: `.${slidePrevClass}`,
          nextEl: `.${slideNextClass}`,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        {...swiperProps}
      >
        {children}
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
