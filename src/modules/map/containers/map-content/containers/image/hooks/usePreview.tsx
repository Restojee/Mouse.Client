import { MapCompleted, MapImage } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  closePreviewImageThunk,
  openPreviewImageThunk,
  selectPreviewImageSrc,
} from "@/modules/map/containers/map-content/slice";
import { selectActiveMapCompleted } from "@/modules/map/containers/map-content/containers/completed-images/slice";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Swiper from "swiper";
import { SwiperClass, SwiperSlide } from "swiper/react";
import { PreviewImageWrapper } from "../components/PreviewImageWrapper";
import { useDeleteCompletedModal } from "./useDeleteCompletedModal";

type UsePreviewProps = {
  images: MapCompleted[] | null;
  image?: MapImage | null;
  mapCompleted?: MapCompleted | null;
  setActiveMapCompleted?: (map: MapCompleted) => void;
};

export const usePreview = ({ images, mapCompleted, setActiveMapCompleted }: UsePreviewProps) => {
  const dispatch = useAppDispatch();
  const openedImage = useAppSelector(selectPreviewImageSrc);
  const activeMapCompleted = useAppSelector(selectActiveMapCompleted);
  const { showDeleteModal } = useDeleteCompletedModal();

  const swiperRef = useRef<Swiper | null>(null);

  const activeIndex = useMemo(() => {
    if (!images || !activeMapCompleted) return 0;
    const idx = images.findIndex((m) => m.id === activeMapCompleted.id);
    return idx >= 0 ? idx : 0;
  }, [images, activeMapCompleted]);

  const imagesCount = useMemo(() => images?.length, [images]);

  const onCloseImage = useCallback(() => {
    dispatch(closePreviewImageThunk());
  }, [dispatch]);

  const onOpenImage = useCallback(
    (image: string) => {
      dispatch(openPreviewImageThunk(image));
    },
    [dispatch],
  );

  const onSwiper = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper;
  }, []);

  const onActiveIndexChange = useCallback(
    (swiper: SwiperClass) => {
      if (!images) return;
      setActiveMapCompleted?.(images[swiper.activeIndex]);
    },
    [images, setActiveMapCompleted],
  );

  useEffect(() => {
    swiperRef.current?.slideTo(activeIndex);
  }, [activeIndex]);

  const hasImages = Boolean(images?.length);
  const showCount = Boolean(imagesCount && imagesCount > 1);

  const renderedSlides = images?.map((el) => (
    <SwiperSlide key={el.id}>
      <PreviewImageWrapper
        onDeleteOpen={showDeleteModal}
        onClick={onOpenImage}
        imagesCount={imagesCount}
        image={el.image?.name}
        mapCompleted={mapCompleted}
      />
    </SwiperSlide>
  ));

  return {
    openedImage,
    activeIndex,
    imagesCount,
    hasImages,
    showCount,
    renderedSlides,
    onCloseImage,
    onOpenImage,
    onSwiper,
    onActiveIndexChange,
  };
};
