import { Map } from '@/api/codegen/genMouseMapsApi';
import { routes } from '@/common/routes';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useMapView = () => {
    const router = useRouter();
    const { mapId } = router.query;

    const id = Number(mapId)

    const openMap = useCallback(async (id: Map['id']) => {
        await router.push(String(id))
    }, [mapId])

    const closeMap = useCallback(async () => {
        await router.push(routes.MAPS)
    }, [])

    return {
        mapId: id,
        openMap,
        closeMap
    };
};

