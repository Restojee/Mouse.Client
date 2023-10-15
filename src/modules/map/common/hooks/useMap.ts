import { Map } from '@/api/codegen/genMouseMapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { routes } from '@/common/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deleteMapsThunk } from '@/modules/map/containers/map-content/slice';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useMap = (mapId?: Map['id']) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onAddMapComplete = () => {
        alert('добавление прохождения карты пока не работает');
    };

    const onAddMap = (): void => {
        alert('добавление карты пока не работает');
    };

    const onAddMapFavorite = (): void => {
        alert('добавление карты в избранное пока не работает');
    };

    const onMapShare = (): void => {
        alert('кнопка поделиться пока не работает');
    };

    const onMapDelete = useCallback(async (): Promise<void> => {
        if (mapId) {
            const res = await dispatch(deleteMapsThunk({ mapId }));

            if (res.payload) {
                await router.push({
                    pathname: routes.MAPS,
                    query: {},
                });
            }
        }


    }, [mapId]);

    const onMapNameCopy = async (name: Map['name']): Promise<void> => {
        const text = `!map ${name}`;

        try {
            await navigator.clipboard.writeText(text);
            dispatch(setAppMessage({severity: 'success', text: 'Скопировано'}))
        } catch (error) {
            dispatch(setAppMessage({severity: 'error', text: 'Ошибка копирования'}))
        }
    };

    return {
        onAddMapComplete,
        onMapDelete,
        onAddMapFavorite,
        onMapShare,
        onAddMap,
        onMapNameCopy,
    };
};

