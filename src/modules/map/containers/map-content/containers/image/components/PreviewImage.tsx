import { getMapImageLink } from "@/common/utils";
import Image, { ImageLoader } from "next/image";
import React, { useCallback, useMemo } from "react";
import { StyledBox } from "@/ui/Box";

type PreviewImagePropsType = {
  setIsLoading: (isLoading: boolean) => void;
  onClick?: (image: string) => void;
  image?: string | null;
  onLoadingHandler: ImageLoader;
  isMapFetching: boolean;
};
export const PreviewImage = (props: PreviewImagePropsType) => {
  const { image, onLoadingHandler, setIsLoading, isMapFetching } = props;

  const mapImage = useMemo(() => {
    return getMapImageLink(image);
  }, [image]);

  const onImageOpen = useCallback(() => {
    if (!image) {
      return;
    }

    props.onClick?.(mapImage);
  }, [image, mapImage, props]);

  if (!image && isMapFetching) {
    return null;
  }

  return (
    <StyledBox
      onClick={onImageOpen}
      cursor={props.image ? "zoom-in" : "default"}
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
    </StyledBox>
  );
};
