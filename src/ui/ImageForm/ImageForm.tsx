import { StyledBox } from '@/ui/Box';
import React, { ChangeEvent, useRef, useState } from 'react';
import { StyledImageFormContainer, StyledImageFormLink } from '@/ui/ImageForm/ImageFormElements';

type ImageFormPropsType = {
    placeholder?: string;
    onClick?: (file: Blob) => void;
    name?: string;
    onChange: (file: Blob) => void;
    value: Blob | null;
    fileType?: 'image';
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
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;

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

    return (
        <StyledImageFormContainer
            onClick={onClickHandler}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            image={props.value && URL.createObjectURL(props.value)}
            isDrag={drag}
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
                <>
                    <StyledImageFormLink>Загрузите</StyledImageFormLink>
                    <span> или перетащите изображение</span>
                </>
            )}
        </StyledImageFormContainer>
    );
};
