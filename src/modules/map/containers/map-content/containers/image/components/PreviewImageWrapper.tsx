import { Display } from "@/ui/Display";
import { ImageActions } from "../../image-actions/ImageActions";
import { PreviewImage } from "./PreviewImage";
import msgStyles from "./PreviewImage.module.scss";
import wrapperStyles from "./PreviewImageWrapper.module.scss";
import clsx from "clsx";
import React from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { MapCompleted } from "@/api/codegen/genMouseMapsApi";

interface Props {
  mapCompleted?: MapCompleted | null;
  imagesCount?: number;
  onClick?: (image: string) => void;
  onDeleteOpen?: () => void;
  image?: string | null;
}

export const PreviewImageWrapper = ({ mapCompleted, onDeleteOpen, image, onClick }: Props) => {
  const isAuth = useAppSelector(selectIsAuth);
  const outerClassName = clsx(msgStyles.contentPreview, wrapperStyles.wrapper);
  const innerClassName = wrapperStyles.imageTransition;

  return (
    <div className={outerClassName}>
      <Display condition={isAuth}>
        <ImageActions
          mapCompleted={mapCompleted}
          onDeleteOpen={onDeleteOpen}
        />
      </Display>
      <div className={innerClassName}>
        <PreviewImage
          image={image}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
