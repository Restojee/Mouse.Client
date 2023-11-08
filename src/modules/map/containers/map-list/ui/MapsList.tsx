import { useAppDispatch } from '@/hooks/useAppDispatch';
import useQueryParams from '@/hooks/useQueryParams';
import { MapCard } from '@/modules/map/containers/map-list/ui/map-card/MapCard';
import { BoxLoader } from '@/ui/BoxLoader/BoxLoader';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getMapsThunk, selectIsMapsFetching, selectMaps } from '@/modules/map/containers/map-list/slice';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { StyledMapsGrid } from '@/modules/map/styles/StyledMapsGrid';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { CommonUtils } from '@/common/utils';
import { StyledBox } from '@/ui/Box';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const MapsList = () => {
    const dispatch = useAppDispatch();

    const maps = useAppSelector(selectMaps);
    const isFetching = useAppSelector(selectIsMapsFetching);
    const router = useRouter();

    const { filter } = useQueryParams();
    const { openMap } = useMapView();

    const onMapClickHandler = async (id: Map['id']) => {
        try {
            await openMap(id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        dispatch(getMapsThunk());
    }, [filter, router.isReady]);

    if (!maps?.length && !isFetching) {
        return (
            <StyledBox
                position={'relative'}
                align={'center'}
                justify={'center'}
                height={'100%'}
                margin={'auto'}
                opacity={0.5}
            >
                {'Карты не найдены'}
            </StyledBox>
        );
    }

    return (
        <>
            <StyledMapsGrid>
                {maps?.map(map => (
                    <MapCard
                        key={map.id}
                        id={map.id}
                        completedCount={map.completedCount}
                        commentsCount={map.commentsCount}
                        isFavorite={map.isFavoriteByUser}
                        onClick={onMapClickHandler}
                        label={map.name}
                        image={CommonUtils.getMapImageLink(map.image)}
                    />
                ))}
            </StyledMapsGrid>
            <BoxLoader isLoading={isFetching}/>
        </>
    );
};