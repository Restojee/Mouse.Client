import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsImageFetching } from '@/modules/map/containers/map-content/slice';
import React from 'react';
import Image from 'next/image';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { DEFAULT_MAP_IMAGE } from '@/common/contants';
import { ImageActions } from '../image-actions/ImageActions';
import { StyledMapContentPreview } from '@/ui/Message/styled';

type MapContentPreviewPropsType = {
    image: Map['image']
}
export const Preview = ({ image }: MapContentPreviewPropsType) => {
    const theme = useAppTheme();

    return (
        <StyledMapContentPreview
            bgColor={theme.colors.mapBackground}
            maxHeight="400px"
            height="100%"
        >
            <ImageActions/>
            <Image
                src={image || DEFAULT_MAP_IMAGE}
                width={800}
                height={400}
                objectFit={'cover'}
                objectPosition={'center'}
                alt={'map'}
                priority
            />
        </StyledMapContentPreview>
    );
};

