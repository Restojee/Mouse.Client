import { StyledImageFormContainer, StyledImageFormLink } from '@/ui/ImageForm/ImageFormElements';
import { Property } from 'csstype';
import React, { useEffect, useRef, useState } from 'react';

type ImageFormPropsType = {
    placeholder?: string;
    onClick?: (file: string) => void;
    name?: string;
    onChange: (file: string) => void;
    value: string | null;
    fileType?: 'image';
    width?: Property.Width<number>;
    height?: Property.Height<number>;
};
export const ImageForm = (props: ImageFormPropsType) => {

    const inputAccept = {
        image: '.png, .jpg, .jpeg',
        document: '.doc, .pdf',
    };
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [drag, setDrag] = useState(false);

    const onClickHandler = () => {
        inputFile.current?.click();
    };

    const convertFileToDataUrl = (file: File, callback: (result: string | void) => void): string | void => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const dataUrl = e.target?.result;
            if (typeof dataUrl === 'string') {
                callback(dataUrl);
            }
        };

        reader.readAsDataURL(file);
    };

    const uploadFile = (files: FileList | null) => {
        if (files && files.length) {
            const file = files[0];
            convertFileToDataUrl(file, (convertedFile) => {
                if (convertedFile) {
                    props.onChange(convertedFile);
                }
            });
        }
    };

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;

        if (files) {
            uploadFile(files);
        }
    };

    function onPasteHandler(e: ClipboardEvent): any {
        const files = e.clipboardData?.files;
        if (files) {
            uploadFile(files);
        }
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
        uploadFile(files);
    };

    useEffect(() => {
        document.addEventListener('paste', onPasteHandler);

        return () => {
            document.removeEventListener('paste', onPasteHandler);
        };
    });

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
                    <StyledImageFormLink>Загрузите скрин,</StyledImageFormLink>
                    <span> перетащите или вставьте из буфера обмена (Ctrl+V)</span>
                </span>
            )}
        </StyledImageFormContainer>
    );
};
