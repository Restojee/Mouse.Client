import { useCallback } from 'react';
import { useGlobalKeyDown } from '@/hooks/useGlobalKeyDown';
import { onCloseMapContentThunk } from '@/modules/map/containers/map-content/slice';
import { Map } from '@/api/codegen/genMouseMapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useRouter } from 'next/router';

export const useMapView = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { levelId } = router.query;

    const id = Number(levelId);

    const openMap = useCallback(async (id: Map['id']): Promise<void> => {
        try {
            await router.push({ query: { ...router.query, levelId: id } });
        } catch (err) {
            dispatch(setAppMessage({ severity: 'error', text: 'Ошибка открытия карты' }));
        }
    }, [router]);

    const closeMap = useCallback(async () => {
        const query = router.query;
        if(query.levelId) {
            delete query.levelId
        }
        await router.push({query});
        await dispatch(onCloseMapContentThunk());
    }, [router]);

    useGlobalKeyDown(async (e) => {
        if (e.key === 'Escape') {
            await closeMap();
        }
    });

    return {
        levelId: id,
        openMap,
        closeMap,
    };
};

