import React, { useEffect, useRef, useState } from 'react';
import { Display } from '@/ui/Display';
import { useImage } from '@/ui/ImageForm/hooks/useImage';
import { StyledImageFormContainer, StyledImageFormLink, StyledImageHover } from '@/ui/ImageForm/ImageFormElements';
import { Property } from 'csstype';

type ImageFormPropsType = {
    placeholder?: string;
    onClick?: (file: string) => void;
    name?: string;
    messageWords?: string;
    onChange: (file: string) => void;
    value: string | null;
    fileType?: 'image';
    width?: Property.Width<number>;
    height?: Property.Height<number>;
};
export const ImageForm = (props: ImageFormPropsType) => {
    const {
        image,
        getDataUrlImage
    } = useImage();

    const inputAccept = {
        image: '.png, .jpg, .jpeg',
        document: '.doc, .pdf',
    };
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [drag, setDrag] = useState(false);

    const onClickHandler = () => {
        inputFile.current?.click();
    };

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
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
    );
};
