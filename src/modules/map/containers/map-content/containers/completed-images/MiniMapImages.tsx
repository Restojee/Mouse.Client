import { MouseEvent, useState } from 'react';
import Image from 'next/image';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from './constants';
import { StyledMiniMapImageContainer } from './styles';
import { DEFAULT_MAP_IMAGE } from '@/common/contants';
import { StyledBox } from '@/ui/Box';

type MiniMapImagesPropsType = {
    maps: Map[]
}
export const MiniMapImages = ({ maps }: MiniMapImagesPropsType) => {
    const [miniMapActiveId, setMiniMapActiveId] = useState(-1);

    const onClickHandler = () => {
        setMiniMapActiveId(-1);
    };

    const onClickImage = (e: MouseEvent<HTMLDivElement>, id?: number) => {
        const currentElement: HTMLDivElement = e.currentTarget;
        if (currentElement) {
            currentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        if (id) {
            setMiniMapActiveId(id);
        }
    };

    return (
        <StyledBox>
            <StyledBox
                minHeight={MINI_IMAGES_HEIGHT}
                overflow={'auto'}
                gap={5}
            >
                <StyledMiniMapImageContainer
                    onClick={onClickHandler}
                    isActive={miniMapActiveId === -1}
                    username="Карта"
                >
                    Карта
                </StyledMiniMapImageContainer>
                {maps.map((item) => (
                    <StyledMiniMapImageContainer
                        key={item.id}
                        onClick={(e) => onClickImage(e, item.id)}
                        isActive={miniMapActiveId === item.id}
                        username={item.user?.username}
                        isVisible
                    >
                        <Image
                            alt={'mini map'}
                            src={item.image || DEFAULT_MAP_IMAGE}
                            height={MINI_IMAGES_HEIGHT}
                            width={MINI_IMAGES_WIDTH}
                        />
                    </StyledMiniMapImageContainer>
                ))}
            </StyledBox>
        </StyledBox>
    );
};
