import { useAppNotifications } from "@/hooks/useAppNotifications";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Display } from '@/ui/Display';
import { useImage } from '@/ui/ImageForm/hooks/useImage';
import { StyledImageFormContainer, StyledImageFormLink, StyledImageHover } from '@/ui/ImageForm/ImageFormElements';
import { Property } from 'csstype';
import { StyledText } from "./styled";

type ImageFormPropsType = {
    placeholder?: string;
    onClick?: (file: string) => void;
    name?: string;
    messageWords?: string;
    onChange: (file: string) => void;
    value: string | null;
    fileType?: 'image';
    maxSizeInMb?: number;
    subTextSize?: "sm" | "md";
    width?: Property.Width<number>;
    height?: Property.Height<number>;
};
export const ImageForm = (props: ImageFormPropsType) => {
    const { onError } = useAppNotifications();

    const {
        image,
        getDataUrlImage
    } = useImage();

    const inputAccept = {
        image: '.png, .jpg, .jpeg',
        document: '.doc, .pdf',
    };

    const maxSizeInBytes = useMemo(() => {
        const maxSizeInMb = props.maxSizeInMb || 1;
        return maxSizeInMb * 1024 * 1024;
    }, [props.maxSizeInMb]);

    const inputFile = useRef<HTMLInputElement | null>(null);
    const [drag, setDrag] = useState(false);

    const onClickHandler = () => {
        inputFile.current?.click();
    };

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        const fileSizeInBytes = e.target.files?.[0].size;

        if (fileSizeInBytes && fileSizeInBytes > maxSizeInBytes) {
            onError?.("Превышен макс. размер файла");
            return;
        }

        getDataUrlImage(files)
    };

    function onPasteHandler(e: ClipboardEvent): any {
        const files = e.clipboardData?.files;
        getDataUrlImage(files)
    };

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
    };

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(false);
        const files = e.dataTransfer.files;
        getDataUrlImage(files)
    };

    useEffect(() => {
        document.addEventListener('paste', onPasteHandler);

        return () => {
            document.removeEventListener('paste', onPasteHandler);
        };
    });

    useEffect(() => {
        if (image) {
            props.onChange(image)
        }
    }, [image]);

    return (
      <div>
          <StyledImageFormContainer
            onClick={onClickHandler}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            image={props.value}
            isDrag={drag}
            width={props.width}
            height={props.height}
          >
              <input
                accept={props.fileType && inputAccept[props.fileType]}
                name={props.name}
                type="file"
                ref={inputFile}
                onChange={uploadHandler}
                style={{ display: 'none' }}
              />
              {!props.value && (
                <span>
                    <StyledImageFormLink>Загрузите {props.messageWords || "скрин"},</StyledImageFormLink>
                    <span> перетащите или вставьте из буфера обмена (Ctrl+V)</span>
                </span>
              )}
              <Display condition={props.value}>
                  <StyledImageHover>
                      Изменить скрин
                  </StyledImageHover>
              </Display>
          </StyledImageFormContainer>
          <StyledText size={props.subTextSize || "md"}>
              Макс. размер файла - 1МБ
          </StyledText>
      </div>

    );
};
