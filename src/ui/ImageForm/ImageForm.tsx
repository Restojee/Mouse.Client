import React, { useEffect, useRef, useState } from 'react';
import { Property } from 'csstype';
import { StyledImageFormContainer, StyledImageFormLink } from '@/ui/ImageForm/ImageFormElements';

type ImageFormPropsType = {
    placeholder?: string;
    onClick?: (file: Blob) => void;
    name?: string;
    onChange: (file: Blob) => void;
    value: Blob | null;
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

    const convertFileToBlob = (file: File, callBack: (value: Blob) => void): void => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: file.type });
            callBack(blob);
        };

        reader.readAsArrayBuffer(file);
    }

    const uploadFile = (files: FileList | null) => {
        if (files && files.length) {
            const file = files[0];
            convertFileToBlob(file, (blob: Blob) => {
                props.onChange(blob);
            });
        }
    };

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;

        if (files) {
            uploadFile(files);
        }
    };

    function onPasteHandler (e: ClipboardEvent): any {
        const files = e.clipboardData?.files
        if(files) {
            uploadFile(files)
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
            document.removeEventListener('paste', onPasteHandler)
        }
    })

    return (
        <StyledImageFormContainer
            onClick={onClickHandler}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            image={props.value && URL.createObjectURL(props.value)}
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
