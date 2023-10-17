import { selectCurrentUserId } from '@/modules/auth/slice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    getCompletedMapsThunk,
    getFavoriteMapsThunk,
    getMapsThunk,
    selectMaps,
} from '@/modules/map/containers/map-list/slice';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { StyledMapsGrid } from '@/modules/map/styles/StyledMapsGrid';
import { MapCard } from '@/modules/map/containers/map-list/ui/map-card/MapCard';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { CommonUtils } from '@/common/utils';
import { StyledBox } from '@/ui/Box';

export const MapsList = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const maps = useAppSelector(selectMaps);
    const userId = useAppSelector(selectCurrentUserId);

    const { openMap } = useMapView();

    const onMapClickHandler = async (id: Map['id']) => {
        try {
            await openMap(id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        switch (router.query.filter) {
            case 'favorites':
                dispatch(getFavoriteMapsThunk({ page: 0, size: 100, userId }));
                break;
            case 'completed':
                dispatch(getCompletedMapsThunk({ userId }));
                break;
            default:
                dispatch(getMapsThunk({ page: 0, size: 100 }));
                break;
        }
    }, [router.query, userId]);

    if (!maps.length) {
        return (
            <StyledBox
                align={'center'}
                justify={'center'}
                height={'100%'}
                margin={'auto'}
                opacity={0.5}
            >
                Карты не найдены
            </StyledBox>
        );
    }

    return (
        <StyledMapsGrid>
            {maps?.map(map => (
                <MapCard
                    key={map.id}
                    id={map.id}
                    // addedCount={ 1 }
                    // commentsCount={ 1 }
                    onClick={onMapClickHandler}
                    label={map.name}
                    image={CommonUtils.getMapImageLink(map.image)}
                />
            ))}
        </StyledMapsGrid>
    );
};