import { getMapImageLink } from "@/common/utils";
import ImageModal from "@/ui/ImageModal/ImageModal";
import Image, { ImageLoader } from "next/image";
import React, { useMemo } from "react";

type PreviewImagePropsType = {
  setIsLoading: (isLoading: boolean) => void;
  image?: string;
  onLoadingHandler: ImageLoader;
  isMapFetching: boolean;
};
export const PreviewImage = (props: PreviewImagePropsType) => {
  const { image, onLoadingHandler, setIsLoading, isMapFetching } = props;

  const mapImage = useMemo(() => {
    return getMapImageLink(image);
  }, [image]);

  if (!image && isMapFetching) {
    return null;
  }

  return (
    <ImageModal
      altText={"map"}
      imageSrc={mapImage}
    >
      <Image
        onLoadStart={() => setIsLoading(true)}
        onLoadingComplete={() => setIsLoading(false)}
        src={mapImage}
        loader={onLoadingHandler}
        width={800}
        height={400}
        objectFit={"contain"}
        objectPosition={"center"}
        alt={"map"}
        priority
      />
    </ImageModal>
  );
};
