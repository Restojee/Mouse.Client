import { Swiper } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import { ReactNode } from "react";
import swiperStyles from "./CardsSwiper.module.scss";
import { ExpandRightIcon } from "@/svg/ExpandRightIcon";
import { ExpandLeftIcon } from "@/svg/ExpandLeftIcon";

interface Props {
  children: ReactNode;
}

export const CardsSwiper = (props: Props) => {
  const slidePrevClass = `card-slider-nav-arrow-prev`;
  const slideNextClass = `card-slider-nav-arrow-next`;

  return (
    <div
      className={swiperStyles.wrapper}
      style={{ display: "flex" }}
    >
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
