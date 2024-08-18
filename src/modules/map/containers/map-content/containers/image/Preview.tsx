import { selectIsAuth } from '@/modules/auth/slice';
import { Display } from '@/ui/Display';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { PreviewImage } from './components/PreviewImage';
import { selectIsMapFetching } from '@/modules/map/containers/map-content/slice';
import { StyledBox } from '@/ui/Box';
import { BoxLoader } from '@/ui/BoxLoader/BoxLoader';
import { ImageLoaderProps } from 'next/image';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { ImageActions } from '../image-actions/ImageActions';
import { StyledMapContentPreview } from '@/ui/Message/styled';

type MapContentPreviewPropsType = {
    image: Map['image']
}
// eslint-disable-next-line react/display-name
export const Preview = React.memo(({ image }: MapContentPreviewPropsType) => {
    const { theme } = useAppTheme();
    const [isLoading, setIsLoading] = useState(true);
    const isMapFetching = useAppSelector(selectIsMapFetching);
    const isAuth = useAppSelector(selectIsAuth);

    const onLoadingHandler = useCallback(({ width, src }: ImageLoaderProps) => {
        return src + '?w=' + width;
    }, [image]);

    useEffect(() => {
        setIsLoading(true)
    }, [image]);

    return (
        <StyledMapContentPreview
            bgColor={theme.colors.mapBackground}
            maxHeight="400px"
            height="100%"
        >
            <Display condition={isAuth}>
                <ImageActions/>
            </Display>
            <StyledBox
                height={'100%'}
                opacity={isLoading ? 0 : 1}
                transition={'0.2s'}
            >
                <PreviewImage
                    isMapFetching={isMapFetching}
                    setIsLoading={setIsLoading}
                    image={image}
                    onLoadingHandler={onLoadingHandler}
                />
            </StyledBox>
            <BoxLoader isLoading={isMapFetching || isLoading}/>
        </StyledMapContentPreview>
    );
});

