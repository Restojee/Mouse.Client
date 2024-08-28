import { Map } from "@/api/codegen/genMouseMapsApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectIsAuth } from "@/modules/auth/slice";
import { selectIsMapFetching } from "@/modules/map/containers/map-content/slice";
import { StyledBox } from "@/ui/Box";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { Display } from "@/ui/Display";
import { StyledMapContentPreview } from "@/ui/Message/styled";
import { ImageLoaderProps } from "next/image";
import React, { useCallback } from "react";
import { ImageActions } from "../image-actions/ImageActions";
import { PreviewImage } from "./components/PreviewImage";

type MapContentPreviewPropsType = {
  image: Map["image"];
};
export const Preview = React.memo(({ image }: MapContentPreviewPropsType) => {
  const { theme } = useAppTheme();
  const isMapFetching = useAppSelector(selectIsMapFetching);
  const isAuth = useAppSelector(selectIsAuth);

  const onLoadingHandler = useCallback(
    ({ width, src }: ImageLoaderProps) => {
      return src + "?w=" + width;
    },
    [image],
  );

  return (
    <StyledMapContentPreview
      bgColor={theme.colors.mapBackground}
      maxHeight="400px"
      height="100%"
    >
      <Display condition={isAuth}>
        <ImageActions />
      </Display>
      <StyledBox
        height={"100%"}
        transition={"0.2s"}
      >
        <PreviewImage
          image={image}
          onLoadingHandler={onLoadingHandler}
        />
      </StyledBox>
      <BoxLoader isLoading={isMapFetching} />
    </StyledMapContentPreview>
  );
});
