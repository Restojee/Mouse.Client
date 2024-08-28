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
import React, { useCallback, useEffect, useState } from "react";
import { ImageActions } from "../image-actions/ImageActions";
import { PreviewImage } from "./components/PreviewImage";

type MapContentPreviewPropsType = {
  image: Map["image"];
};
export const Preview = React.memo(({ image }: MapContentPreviewPropsType) => {
  const { theme } = useAppTheme();
  const isMapFetching = useAppSelector(selectIsMapFetching);
  const isAuth = useAppSelector(selectIsAuth);

  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const onLoadingHandler = useCallback(({ width, src }: ImageLoaderProps) => {
    return src + "?w=" + width;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 500); // Показываем Loader через 2 секунды

    return () => {
      clearTimeout(timer); // Очистка таймера при размонтировании компонента или смене изображения
      setShowLoader(false); // Сброс состояния при смене изображения
    };
  }, [image]);

  useEffect(() => {
    if (!isLoading && !isMapFetching) {
      setShowLoader(false); // Скрываем Loader, если загрузка завершена
    }
  }, [isLoading, isMapFetching]);

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
          isMapFetching={isMapFetching}
          setIsLoading={setIsLoading}
          image={image}
          onLoadingHandler={onLoadingHandler}
        />
      </StyledBox>
      <BoxLoader isLoading={(isMapFetching || isLoading) && showLoader} />
    </StyledMapContentPreview>
  );
});
