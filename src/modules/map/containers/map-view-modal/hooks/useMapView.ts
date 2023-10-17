import React, { useCallback } from 'react';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { routes } from '@/common/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuth } from '@/modules/auth/slice';
import { useRouter } from 'next/router';

export const useMapView = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { mapId } = router.query;

    const isAuth = useAppSelector(selectIsAuth)

    const id = Number(mapId);

    const openMap = useCallback(async (id: Map['id']): Promise<void> => {
        if (id && isAuth) {
            await router.push({
                pathname: router.pathname,
                query: { mapId: id },
            });
        } else {
            dispatch(setAppMessage({severity: 'error', text: 'Ошибка открытия карты'}))
        }
    }, [mapId, isAuth]);

    const closeMap = useCallback(async () => {
        await router.push(routes.MAPS);
    }, [router]);

    return {
        mapId: id,
        openMap,
        closeMap,
    };
};

