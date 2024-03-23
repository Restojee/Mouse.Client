import { useState } from 'react';
import { StyledBox } from '@/ui/Box';
import Image, { ImageProps } from 'next/image';

type AppImageType = ImageProps;
export const AppImage = (props: AppImageType) => {
    const {
        height,
        width,
        src,
        alt,
        ...restProps
    } = props;

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <StyledBox
                display={isLoaded ? 'none' : 'initial'}
                height={'100%'}
                width={'100%'}
            >
                <Image
                    src={src}
                    width={10}
                    height={10}
                    alt={alt}
                    style={{
                        filter: 'blur(6px)',
                    }}
                    quality={100}
                    objectFit={'cover'}
                    priority
                />
            </StyledBox>
            <StyledBox display={isLoaded ? 'initial' : 'none'}>
                <Image
                    onLoad={() => setIsLoaded(true)}
                    src={src}
                    width={width}
                    height={height}
                    alt={alt}
                    {...restProps}
                />
            </StyledBox>
        </>
    );
};

