import { Map } from '@/api/codegen/genMouseMapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { routes } from '@/common/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    addFavorite,
    deleteMapThunk,
    selectIsMapImageModalOpen, setIsMapImageModalOpen,
    updateMapImageThunk,
} from '@/modules/map/containers/map-content/slice';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useMap = (mapId?: Map['id']) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const isMapImageModalOpen = useAppSelector(selectIsMapImageModalOpen);

    const onTextCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            dispatch(setAppMessage({ severity: 'success', text: 'Скопировано' }));
        } catch (error) {
            dispatch(setAppMessage({ severity: 'error', text: 'Ошибка копирования' }));
        }
    };

    const onAddMapFavorite = useCallback((): void => {
        if (mapId) {
            dispatch(addFavorite({ mapId }));
        }
    }, [mapId]);

    const onMapDelete = useCallback(async (): Promise<void> => {
        if (mapId) {
            const res = await dispatch(deleteMapThunk({ mapId }));

            if (res.payload) {
                await router.push({ pathname: routes.MAPS, query: {} });
            }
        }
    }, [mapId]);

    const onMapImageUpdate = useCallback(async (file: string): Promise<boolean> => {
        try {
            if (mapId) {
                const res = await dispatch(updateMapImageThunk({ mapId,  file }));
                dispatch(setAppMessage({ severity: 'success', text: 'Обложка обновлена' }));
                return Boolean(res.payload);
            }
        } catch (error) {
            dispatch(setAppMessage({ severity: 'error', text: 'Ошибка обновления обложки' }));
            return false;
        }
        return false;
    }, [mapId]);

    const onMapShare = useCallback(async (): Promise<void> => {
        const text = window.location.href;
        await onTextCopy(text);
    }, [mapId]);

    const onMapNameCopy = useCallback(async (name: Map['name']): Promise<void> => {
        const text = `!map ${name}`;

        await onTextCopy(text);
    }, [mapId]);

    const onMapImageModalOpen = useCallback(() => {
        dispatch(setIsMapImageModalOpen(true));
    }, []);

    const onMapImageModalClose = useCallback(() => {
        dispatch(setIsMapImageModalOpen(false));
    }, []);

    return {
        isMapImageModalOpen,
        onMapDelete,
        onAddMapFavorite,
        onMapShare,
        onMapNameCopy,
        onMapImageUpdate,
        onMapImageModalOpen,
        onMapImageModalClose,
    };
};

