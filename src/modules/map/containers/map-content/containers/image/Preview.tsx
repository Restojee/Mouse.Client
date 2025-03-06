import { MapCompleted } from "@/api/codegen/genMouseMapsApi";
import { Display } from "@/ui/Display";
import { StyledMapContentCount } from "@/ui/Message/styled";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SwiperClass, SwiperSlide } from "swiper/react";
import ImageModal from "@/ui/ImageModal/ImageModal";
import { ImagesSwiper } from "@/ui/ImagesSwiper/ImagesSwiper";
import { PreviewImageWrapper } from "./components/PreviewImageWrapper";
import { StyledBox } from "@/ui/Box";
import { DeleteModal } from "@/modules/map/containers/map-content/containers/image/components/DeleteModal";
import Swiper from "swiper";

type MapContentPreviewPropsType = {
  images: MapCompleted[] | null;
  image?: string | null;
  mapCompleted?: MapCompleted | null;
  setActiveMapCompleted?: (map: MapCompleted) => void;
};
export const Preview = React.memo(
  ({ images, image, setActiveMapCompleted, mapCompleted }: MapContentPreviewPropsType) => {
    const [openedImage, setOpenedImage] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [actualImages, setActualImages] = useState(images);

    const swiperRef = useRef<Swiper | null>(null);

    const onCloseImage = useCallback(() => {
      setOpenedImage(null);
    }, []);

    const onOpenImage = useCallback((image: string) => {
      setOpenedImage(image);
    }, []);

    const onCloseDeleteModal = useCallback(() => {
      setIsDeleteOpen(false);
    }, []);

    const onOpenDeleteModal = useCallback(() => {
      setIsDeleteOpen(true);
    }, []);

    const onSwiper = useCallback((swiper: SwiperClass) => {
      swiperRef.current = swiper;
    }, []);

    const onActiveIndexChange = useCallback(
      (swiper: SwiperClass) => {
        if (!images) {
          return;
        }

        setActiveIndex(swiper.activeIndex);
        setActiveMapCompleted?.(images[swiper.activeIndex]);
      },
      [images, setActiveMapCompleted],
    );

    const imagesCount = useMemo(() => {
      return images?.length;
    }, [images]);

    const onSlideChange = useCallback(
      (map: MapCompleted, length: number) => {
        setActiveMapCompleted?.(map);
        setActiveIndex(length);
        swiperRef.current?.slideTo(length);
      },
      [setActiveMapCompleted],
    );
    useEffect(() => {
      const currentUserId = images?.[0].user.id;
      const actualUserId = actualImages?.[0].user.id;
      const isUserChanged = currentUserId !== actualUserId;

      const lastMap = images?.at(-1);

      if (!currentUserId || !images?.length || !actualImages) {
        return;
      }
      console.log("awdawd");

      setActualImages(images);

      if (images.length > actualImages.length && lastMap && !isUserChanged) {
        onSlideChange(lastMap, images?.length);
        return;
      }

      onSlideChange(images?.[0], 0);
    }, [images?.length]);

    if (!images?.length) {
      return (
        <>
          <ImageModal
            altText={"map"}
            onClose={onCloseImage}
            imageSrc={openedImage}
          />
          <PreviewImageWrapper
            onClick={onOpenImage}
            image={image}
          />
        </>
      );
    }

    return (
      <StyledBox position={"relative"}>
        <ImageModal
          altText={"map"}
          onClose={onCloseImage}
          imageSrc={openedImage}
        />
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={onCloseDeleteModal}
        />
        <Display condition={imagesCount && imagesCount > 1}>
          <StyledMapContentCount>
            {activeIndex + 1} из {imagesCount}
          </StyledMapContentCount>
        </Display>
        <ImagesSwiper
          onInit={onSwiper}
          onActiveIndexChange={onActiveIndexChange}
        >
          {images?.map((el) => (
            <SwiperSlide key={el.id}>
              <PreviewImageWrapper
                onDeleteOpen={onOpenDeleteModal}
                onClick={onOpenImage}
                imagesCount={imagesCount}
                image={el.image}
                mapCompleted={mapCompleted}
              />
            </SwiperSlide>
          ))}
        </ImagesSwiper>
      </StyledBox>
    );
  },
);
