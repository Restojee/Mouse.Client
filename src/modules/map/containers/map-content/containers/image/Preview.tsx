import React from "react";
import { MapCompleted, MapImage } from "@/api/codegen/genMouseMapsApi";
import { Display } from "@/ui/Display";
import { ImagesSwiper } from "@/ui/ImagesSwiper/ImagesSwiper";
import msgStyles from "@/ui/Message/Message.module.scss";
import { PreviewImageWrapper } from "./components/PreviewImageWrapper";
import previewStyles from "./Preview.module.scss";
import { usePreview } from "./hooks/usePreview";

type PreviewPropsType = {
  images: MapCompleted[] | null;
  image?: MapImage | null;
  mapCompleted?: MapCompleted | null;
  setActiveMapCompleted?: (map: MapCompleted) => void;
};

export const Preview = React.memo((props: PreviewPropsType) => {
  const { image } = props;
  const {
    activeIndex,
    imagesCount,
    hasImages,
    showCount,
    renderedSlides,
    onOpenImage,
    onSwiper,
    onActiveIndexChange,
  } = usePreview(props);

  if (!hasImages) {
    return (
      <PreviewImageWrapper
        onClick={onOpenImage}
        image={image?.name}
      />
    );
  }

  return (
    <div className={previewStyles.previewContainer}>
      <Display condition={showCount}>
        <div className={msgStyles.contentCount}>
          {activeIndex + 1} из {imagesCount}
        </div>
      </Display>
      <ImagesSwiper
        onInit={onSwiper}
        onActiveIndexChange={onActiveIndexChange}
      >
        {renderedSlides}
      </ImagesSwiper>
    </div>
  );
});

Preview.displayName = "Preview";
