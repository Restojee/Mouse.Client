import { Swiper, SwiperProps } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/pagination";
import "swiper/css";
import { ReactNode } from "react";
import swiperStyles from "./ImagesSwiper.module.scss";
import { ExpandRightIcon } from "@/svg/ExpandRightIcon";
import { ExpandLeftIcon } from "@/svg/ExpandLeftIcon";

interface Props extends SwiperProps {
  children: ReactNode;
}

export const ImagesSwiper = ({ children, ...swiperProps }: Props) => {
  const slidePrevClass = `images-slider-nav-arrow-prev`;
  const slideNextClass = `images-slider-nav-arrow-next`;

  return (
    <div className={swiperStyles.wrapper}>
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
      <div
        className={[swiperStyles.navArrow, slideNextClass].join(" ")}
        style={{ right: -18 }}
      >
        <ExpandRightIcon />
      </div>
      <div
        className={[swiperStyles.navArrow, slidePrevClass].join(" ")}
        style={{ left: -18 }}
      >
        <ExpandLeftIcon />
      </div>
    </div>
  );
};
