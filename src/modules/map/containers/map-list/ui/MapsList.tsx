import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { MapCard } from '@/modules/map/containers/map-list/ui/map-card/MapCard';
import { BoxLoader } from '@/ui/BoxLoader/BoxLoader';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getMapsThunk, selectIsMapsFetching, selectMaps } from '@/modules/map/containers/map-list/slice';
import { StyledMapsGrid } from '@/modules/map/styles/StyledMapsGrid';
import { StyledBox } from '@/ui/Box';
import { useRouter } from 'next/router';

// eslint-disable-next-line react/display-name
export const MapsList = React.memo(() => {
    const dispatch = useAppDispatch();

    const maps = useAppSelector(selectMaps);
    const isFetching = useAppSelector(selectIsMapsFetching);
    const router = useRouter();

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        dispatch(getMapsThunk());
    }, [router.query.filter, router.isReady]);

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
                    <MapCard key={map.id} map={map}/>
                ))}
            </StyledMapsGrid>
            <BoxLoader isLoading={isFetching}/>
        </>
    );
});