import { StyledMiniMapImageContainer, StyledMiniMapImagesContainer } from "@/modules/map/styled";
import { useState } from "react";
import { mapsData } from "@/moc/mapsMoc";
import Image from "next/image";
import { DEFAULT_MAP_IMAGE } from "@/common/contants";

export const MiniMapImages = () => {
    const [miniMapActiveId, setMiniMapActiveId] = useState(1)
    
    const onClickHandler = () => {
        setMiniMapActiveId(-1);
    };
    
    const onClickImage = (id?: number) => {
        if (id) {
            setMiniMapActiveId(id);
        }
    };
    
    return (
        <StyledMiniMapImagesContainer>
            <StyledMiniMapImageContainer
                onClick={ onClickHandler }
                isActive={ miniMapActiveId === -1 }
                username="Карта"
            >
                Карта
            </StyledMiniMapImageContainer>
            { mapsData.map((item) => (
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
        </StyledMiniMapImagesContainer>
    );
};
