import React, { ChangeEvent, useRef, useState } from 'react';
import { StyledImageFormContainer, StyledImageFormLink } from "@/ui/ImageForm/ImageFormElements";

type ImageFormPropsType = {
    placeholder?: string;
    onClick?: (file: string) => void;
    name?: string;
    onChange: (file: string) => void;
    value: string;
    fileType?: "image";
};
export const ImageForm = (props: ImageFormPropsType) => {

    const inputAccept = {
        image: ".png, .jpg, .jpeg, .gif",
        document: ".doc, .pdf",
    };
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [drag, setDrag] = useState(false);

    const onClickHandler = () => {
        inputFile.current?.click();
    };

    const convertFileToBase64 = (file: File, callBack: (value: string) => void): void => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string;
            callBack(file64);
        };
        reader.readAsDataURL(file);
    };
    const uploadFile = (files: any) => {
        if (files && files.length) {
            const file = files[0];
            convertFileToBase64(file, (file64: string) => {
                props.onChange(file64);
            })
        }
    };
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        uploadFile(files);
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
            onClick={ onClickHandler }
            onDragStart={ (e) => dragStartHandler(e) }
            onDragLeave={ (e) => dragLeaveHandler(e) }
            onDragOver={ (e) => dragStartHandler(e) }
            onDrop={ (e) => onDropHandler(e) }
            image={ props.value }
            isDrag={ drag }
        >
            <input
                accept={ props.fileType && inputAccept[props.fileType] }
                name={ props.name }
                type="file"
                ref={ inputFile }
                onChange={ uploadHandler }
                style={ { display: "none" } }
            />
            { !props.value && (
                <>
                    <StyledImageFormLink>Загрузите,</StyledImageFormLink>
                    <span> перетащите изображение или вставьте из буфера (Ctrl+V)</span>
                </>
            ) }
        </StyledImageFormContainer>
    );
}
