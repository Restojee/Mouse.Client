import { Display } from "@/ui/Display";
import { ImageActions } from "../../image-actions/ImageActions";
import { StyledBox } from "@/ui/Box";
import { PreviewImage } from "./PreviewImage";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { StyledMapContentPreview } from "@/ui/Message/styled";
import React, { useCallback, useEffect, useState } from "react";
import { ImageLoaderProps } from "next/image";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { selectIsMapFetching } from "@/modules/map/containers/map-content/slice";
import { MapCompleted } from "@/api/codegen/genMouseMapsApi";

interface Props {
  mapCompleted?: MapCompleted | null;
  imagesCount?: number;
  onClick?: (image: string) => void;
  onDeleteOpen?: () => void;
  image?: string | null;
}

export const PreviewImageWrapper = ({ mapCompleted, onDeleteOpen, image, onClick }: Props) => {
  const { theme } = useAppTheme();

  const isAuth = useAppSelector(selectIsAuth);
  const isMapFetching = useAppSelector(selectIsMapFetching);

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
  }, []);

  useEffect(() => {
    if (!isLoading && !isMapFetching) {
      setShowLoader(false); // Скрываем Loader, если загрузка завершена
    }
  }, [isLoading, isMapFetching]);

  return (
    <StyledMapContentPreview
      bgColor={theme.colors.mapBackground}
      maxHeight="400px"
      borderRadius={"20px"}
      height="100%"
    >
      <Display condition={isAuth}>
        <ImageActions
          mapCompleted={mapCompleted}
          onDeleteOpen={onDeleteOpen}
        />
      </Display>
      <StyledBox
        height={"100%"}
        transition={"0.2s"}
      >
        <PreviewImage
          isMapFetching={isMapFetching}
          setIsLoading={setIsLoading}
          image={image}
          onClick={onClick}
          onLoadingHandler={onLoadingHandler}
        />
      </StyledBox>
      <BoxLoader isLoading={(isMapFetching || isLoading) && showLoader} />
    </StyledMapContentPreview>
  );
};
