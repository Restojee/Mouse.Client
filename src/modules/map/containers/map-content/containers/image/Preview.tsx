import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsImageFetching } from '@/modules/map/containers/map-content/slice';
import { StyledBox } from '@/ui/Box';
import { BoxLoader } from '@/ui/BoxLoader/BoxLoader';
import Image from 'next/image';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { DEFAULT_MAP_IMAGE } from '@/common/contants';
import { ImageActions } from '../image-actions/ImageActions';
import { StyledMapContentPreview } from '@/ui/Message/styled';

type MapContentPreviewPropsType = {
    image: Map['image']
}
// eslint-disable-next-line react/display-name
export const Preview = React.memo(({ image }: MapContentPreviewPropsType) => {
    const theme = useAppTheme();
    const isImageLoading = useAppSelector(selectIsImageFetching);

    return (
        <StyledMapContentPreview
            bgColor={theme.colors.mapBackground}
            maxHeight="400px"
            height="100%"
        >
            <ImageActions/>
            <StyledBox
                opacity={isImageLoading ? 0 : 1}
                transition={'0.2s'}
            >
                <Image
                    src={image || DEFAULT_MAP_IMAGE}
                    width={800}
                    height={400}
                    objectFit={'cover'}
                    objectPosition={'center'}
                    alt={'map'}
                    priority
                />
            </StyledBox>
            <BoxLoader isLoading={isImageLoading}/>
        </StyledMapContentPreview>
    );
});

