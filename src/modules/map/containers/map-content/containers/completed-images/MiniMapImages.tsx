import React from 'react';
import Image from 'next/image';
import { getMapImageLink } from '@/common/utils';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { useCompletedMap } from './hooks/useCompletedMap';
import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from './constants';
import { StyledMiniMapImageContainer } from './styles';
import { StyledBox } from '@/ui/Box';

export const MiniMapImages = () => {
    const { mapId } = useMapView();

    const {
        maps,
        activeId,
        onMapClick,
        onInitialMapClick
    } = useCompletedMap(mapId);

    if (!maps?.length) {
        return null;
    }

    return (
        <StyledBox>
            <StyledBox
                minHeight={MINI_IMAGES_HEIGHT}
                overflow={'auto'}
                gap={5}
            >
                <StyledMiniMapImageContainer
                    onClick={onInitialMapClick}
                    isActive={activeId === null}
                    username="Карта"
                >
                    Карта
                </StyledMiniMapImageContainer>
                {maps?.map((item, index) => (
                    <StyledMiniMapImageContainer
                        key={item.id ? `${item.id + index}` : index}
                        onClick={(e) => onMapClick(e, item)}
                        isActive={activeId === item.id}
                        username={item.user?.username}
                        isVisible
                    >
                        <Image
                            alt={item.user?.username}
                            src={getMapImageLink(item?.image)}
                            height={MINI_IMAGES_HEIGHT}
                            width={MINI_IMAGES_WIDTH}
                        />
                    </StyledMiniMapImageContainer>
                ))}
            </StyledBox>
        </StyledBox>
    );
};
