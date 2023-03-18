import { StyledMiniMapImageContainer, StyledMiniMapImagesContainer } from "@/layout/mapView/styled";
import { useState } from "react";

export const MiniMapImages = () => {

    const [miniMapActiveId, setMiniMapActiveId] = useState(1)


    const onClickHandler = () => {
        setMiniMapActiveId(-1);
    };
    const onClickImage = (id: number) => {
        setMiniMapActiveId(id);
    };

    return (
        <StyledMiniMapImagesContainer>
            <StyledMiniMapImageContainer
                onClick={onClickHandler}
                isActive={miniMapActiveId === -1}
                username="Карта"
            >
                Карта
            </StyledMiniMapImageContainer>
            {/*{.map((item) => (*/}
            {/*    <StyledMiniMapImageContainer*/}
            {/*        onClick={() => onClickImage(item.image, item.id)}*/}
            {/*        isActive={miniMapActiveId === item.id}*/}
            {/*        key={item.id}*/}
            {/*        isVisible*/}
            {/*        username={item.user}>*/}
            {/*        <Image alt={'mini map'} src={item.image} />*/}
            {/*    </StyledMiniMapImageContainer>*/}
            {/*))}*/}
        </StyledMiniMapImagesContainer>
    );
};
