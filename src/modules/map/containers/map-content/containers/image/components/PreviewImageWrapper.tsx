import { Display } from "@/ui/Display";
import { ImageActions } from "../../image-actions/ImageActions";
import { StyledBox } from "@/ui/Box";
import { PreviewImage } from "./PreviewImage";
import { StyledMapContentPreview } from "@/ui/Message/styled";
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

  return (
    <StyledMapContentPreview
      borderRadius={"20px"}
      height="100%"
      minHeight={"395px"}
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
          image={image}
          onClick={onClick}
        />
      </StyledBox>
    </StyledMapContentPreview>
  );
};
