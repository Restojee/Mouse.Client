import { Map } from '@/api/codegen/genMouseMapsApi';
import { routes } from '@/common/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deleteMapsThunk } from '@/modules/map/containers/map-list/slice';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useMap = (mapId?: Map['id']) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onAddMapComplete = () => {
        alert('добавление прохождения карты пока не работает')
    }

    const onAddMap = (): void => {
        alert('добавление карты пока не работает')
    }

    const onAddMapFavorite = (): void => {
        alert('добавление карты в избранное пока не работает')
    }

    const onMapShare = (): void => {
        alert('кнопка поделиться пока не работает')
    }

    const onMapDelete = useCallback(async (): Promise<void> => {
        try {
            if(mapId) {
                dispatch(deleteMapsThunk({ mapId }))
                await router.push({
                    pathname: routes.MAPS,
                    query: {}
                })
            }
        } catch (error) {
            console.log('Ошибка удаления')
        }

    }, [mapId])

    const onMapNameCopy = async (name: Map['name']): Promise<void> => {
        const text = `!map ${name}`

        try {
            await navigator.clipboard.writeText(text);
            alert('Скопировано!');
        } catch (error) {
            alert('Ошибка копирования');
        }
    }

    return {
        onAddMapComplete,
        onMapDelete,
        onAddMapFavorite,
        onMapShare,
        onAddMap,
        onMapNameCopy
    };
};

