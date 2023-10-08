import { StyledMiniMapImageContainer } from "@/modules/map/styles/styled";
import { useState } from "react";
import Image from "next/image";
import { DEFAULT_MAP_IMAGE } from "@/common/contants";
import { StyledBox } from "@/ui/Box";
import { Map } from '@/api/codegen/genMouseMapsApi';

type MiniMapImagesPropsType = {
    maps: Map[]
}
export const MiniMapImages = ({maps}: MiniMapImagesPropsType) => {
    const [miniMapActiveId, setMiniMapActiveId] = useState(-1)
    
    const onClickHandler = () => {
        setMiniMapActiveId(-1);
    };
    
    const onClickImage = (id?: number) => {
        if (id) {
            setMiniMapActiveId(id);
        }
    };
    
    return (
        <StyledBox borderRadius={10}>
            <StyledMiniMapImageContainer
                onClick={ onClickHandler }
                isActive={ miniMapActiveId === -1 }
                username="Карта"
            >
                Карта
            </StyledMiniMapImageContainer>
            { maps.map((item) => (
                <StyledMiniMapImageContainer
                    onClick={ () => onClickImage(item.id) }
                    isActive={ miniMapActiveId === item.id }
                    key={ item.id }
                    isVisible
                    username={ item.user?.username }>
                    <Image
                        alt={ 'mini map' }
                        src={ item.image || DEFAULT_MAP_IMAGE }
                        height={ 80 }
                        width={ 130 }
                    />
                </StyledMiniMapImageContainer>
            )) }
        </StyledBox>
    );
};
