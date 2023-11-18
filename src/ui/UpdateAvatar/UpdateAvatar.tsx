import React, { useEffect, useRef } from 'react';
import { getMapImageLink } from '@/common/utils';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { useImage } from '@/ui/ImageForm/hooks/useImage';
import { StyledUpdateAvatar, StyledUpdateAvatarShadow } from './styles';

type UpdateAvatarType = {
    currentImage?: string;
    size?: number;
    onChange?: (image: string) => void;
}
export const UpdateAvatar = (props: UpdateAvatarType) => {
    const {
        currentImage,
        onChange,
    } = props;

    const {
        image,
        getDataUrlImage,
    } = useImage();

    const inputFile = useRef<HTMLInputElement | null>(null);

    const onClickHandler = () => {
        inputFile.current?.click();
    };

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        getDataUrlImage(files);
    };

    useEffect(() => {
        if (image && onChange) {
            onChange(image);
        }
    }, [image]);

    return (
        <StyledUpdateAvatar
            image={`url(${image || getMapImageLink(currentImage)})` || ''}
            onClick={onClickHandler}
        >
            <input
                type={'file'}
                onChange={uploadHandler}
                ref={inputFile}
                accept={'.png, .jpg, .jpeg'}
                style={{ display: 'none' }}
            />
            <StyledUpdateAvatarShadow>
                <EditFillIcon size={30}/>
            </StyledUpdateAvatarShadow>
        </StyledUpdateAvatar>
    );
};

