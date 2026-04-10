import { getMapImageLink } from "@/common/utils";
import React, { useCallback, useMemo } from "react";
import { StyledBox } from "@/ui/Box";

type PreviewImagePropsType = {
  onClick?: (image: string) => void;
  image?: string | null;
};
export const PreviewImage = (props: PreviewImagePropsType) => {
  const { image } = props;

  const mapImage = useMemo(() => {
    return getMapImageLink(image, "display");
  }, [image]);

  const onImageOpen = useCallback(() => {
    if (!image) {
      return;
    }

    props.onClick?.(mapImage);
  }, [image, mapImage, props]);

  if (!image) {
    return null;
  }

  return (
    <StyledBox
      onClick={onImageOpen}
      cursor={props.image ? "zoom-in" : "default"}
    >
      <img
        src={mapImage}
        width={800}
        height={400}
        style={{
          objectPosition: "center",
          objectFit: "cover",
        }}
        alt="map"
      />
    </StyledBox>
  );
};
