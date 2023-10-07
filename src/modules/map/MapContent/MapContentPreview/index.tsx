import React from 'react';
import Image from 'next/image';
import { DEFAULT_MAP_IMAGE } from '@/common/contants';
import { useAppTheme } from '@/hooks/useAppTheme';
import { StyledMapContentPreview } from '@/ui/Message/styled';
import { Map } from '@/api/codegen/genMouseMapsApi';

type MapContentPreviewPropsType = {
    image: Map['image']
}
export const MapContentPreview = ({image}: MapContentPreviewPropsType) => {
    const theme = useAppTheme();

    return (
        <StyledMapContentPreview
            bgColor={ theme.colors.mapBackground }
            maxHeight="400px"
            height="100%"
        >
            <Image
                src={ image || DEFAULT_MAP_IMAGE }
                width={ 800 }
                height={ 400 }
                alt="map"
            />
        </StyledMapContentPreview>
    );
};

