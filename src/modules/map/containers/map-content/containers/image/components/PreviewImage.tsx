import { getMapImageLink } from "@/common/utils";
import React, { useCallback, useMemo } from "react";
import { Box } from "@/ui/Box";
import styles from "./PreviewImage.module.scss";

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
    <Box
      onClick={onImageOpen}
      cursor={props.image ? "zoom-in" : "default"}
      className={styles.imageFrame}
    >
      <img
        src={mapImage}
        width={"100%"}
        height={"100%"}
        className={styles.image}
        alt="map"
      />
    </Box>
  );
};
