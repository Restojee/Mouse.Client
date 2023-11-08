import React from 'react';
import Image from 'next/image';
import { getMapImageLink } from '@/common/utils';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { useCompletedMap } from './hooks/useCompletedMap';
import { MINI_IMAGES_HEIGHT, MINI_IMAGES_WIDTH } from './constants';
import { StyledMiniMapImageContainer } from './styles';
import { StyledBox } from '@/ui/Box';

export const MiniMapImages = () => {
    const { levelId } = useMapView();

    const {
        maps,
        onMapClick,
        activeMapCompleted
    } = useCompletedMap(levelId);

    if (!maps?.length) {
        return null;
    }

    return (
        <StyledBox>
            <StyledBox
                minHeight={MINI_IMAGES_HEIGHT}
                overflow={'auto'}
                gap={10}
            >
                <StyledMiniMapImageContainer
                    onClick={(e) => onMapClick(e, null)}
                    isActive={!activeMapCompleted}
                    username="Карта"
                >
                    Карта
                </StyledMiniMapImageContainer>
                {maps?.map((item, index) => (
                    <StyledMiniMapImageContainer
                        key={item.createdUtcDate}
                        onClick={(e) => onMapClick(e, item.user?.id)}
                        isActive={activeMapCompleted?.user.id === item.user?.id}
                        username={item.user?.username}
                        isVisible
                    >
                        <Image
                            alt={item.user?.username}
                            src={getMapImageLink(item?.image)}
                            height={MINI_IMAGES_HEIGHT}
                            width={MINI_IMAGES_WIDTH}
                            objectPosition={'center'}
                            objectFit={'cover'}
                        />
                    </StyledMiniMapImageContainer>
                ))}
            </StyledBox>
        </StyledBox>
    );
};
