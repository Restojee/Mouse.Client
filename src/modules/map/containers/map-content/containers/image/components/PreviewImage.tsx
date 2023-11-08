import React, { useMemo } from 'react';
import { getMapImageLink } from '@/common/utils';
import Image, { ImageLoader } from 'next/image';

type PreviewImagePropsType = {
    setIsLoading: (isLoading: boolean) => void;
    image?: string;
    onLoadingHandler: ImageLoader;
    isMapFetching: boolean;
}
export const PreviewImage = (props: PreviewImagePropsType) => {
    const {
        image,
        onLoadingHandler,
        setIsLoading,
        isMapFetching
    } = props;

    const mapImage = useMemo(() => {
        return getMapImageLink(image);
    }, [image]);

    if (!image && isMapFetching) {
        return null;
    }

    return (
        <Image
            onLoadStart={() => setIsLoading(true)}
            onLoadingComplete={() => setIsLoading(false)}
            src={mapImage}
            loader={onLoadingHandler}
            width={700}
            height={400}
            objectFit={'contain'}
            objectPosition={'center'}
            alt={'map'}
            priority
        />
    );
};

