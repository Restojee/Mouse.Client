import { getMapImageLink } from "@/common/utils";
import ImageModal from "@/ui/ImageModal/ImageModal";
import { ImageLoader } from "next/image";
import React, { useMemo } from "react";

type PreviewImagePropsType = {
  image?: string;
  onLoadingHandler: ImageLoader;
};
export const PreviewImage = (props: PreviewImagePropsType) => {
  const { image } = props;

  const mapImage = useMemo(() => {
    return getMapImageLink(image);
  }, [image]);

  if (!image) {
    return null;
  }

  return (
    <ImageModal
      altText={"map"}
      imageSrc={mapImage}
    />
  );
};
