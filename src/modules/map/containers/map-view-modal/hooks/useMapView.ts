import { Map } from '@/api/codegen/genMouseMapsApi';
import { routes } from '@/common/routes';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

export const useMapView = () => {
    const router = useRouter();
    const { mapId } = router.query;

    const id = Number(mapId);

    const openMap = useCallback(async (id: Map['id']) => {
        await router.push({
            pathname: router.pathname,
            query: { mapId: id },
        });
    }, [mapId]);

    const closeMap = useCallback(async () => {
        await router.push(routes.MAPS);
    }, [router]);

    return {
        mapId: id,
        openMap,
        closeMap,
    };
};

