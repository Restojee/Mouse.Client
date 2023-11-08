import { Map } from '@/api/codegen/genMouseMapsApi';
import { setAppMessage } from '@/bll/appReducer';
import { routes } from '@/common/routes';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    addFavorite,
    deleteMapThunk, removeFavorite,
    selectIsMapImageModalOpen,
    selectMapContent,
    setIsMapImageModalOpen,
    updateMapImageThunk,
} from '@/modules/map/containers/map-content/slice';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useMap = (levelId?: Map['id']) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const isMapImageModalOpen = useAppSelector(selectIsMapImageModalOpen);
    const map = useAppSelector(selectMapContent);

    const onToggleMapFavorite = useCallback((): void => {
        if (levelId && !map?.isFavoriteByUser) {
            dispatch(addFavorite({ levelId }));
            return
        }

        if (levelId && map?.isFavoriteByUser) {
            dispatch(removeFavorite({ levelId }))
        }

    }, [levelId, map?.isFavoriteByUser]);

    const onMapDelete = useCallback(async (): Promise<void> => {
        if (levelId) {
            const res = await dispatch(deleteMapThunk({ levelId }));

            if (res.payload) {
                await router.push({ pathname: routes.MAPS, query: {} });
            }
        }
    }, [levelId]);

    const onMapImageUpdate = useCallback(async (file: string) => {
        if (levelId) {
            const res = await dispatch(updateMapImageThunk({ levelId,  file }));
            return res.payload;
        }
    }, [levelId]);

    const onTextCopy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            dispatch(setAppMessage({ severity: 'success', text: 'Скопировано' }));
        } catch (error) {
            dispatch(setAppMessage({ severity: 'error', text: 'Ошибка копирования' }));
        }
    }, []);

    const onMapShare = useCallback(async (): Promise<void> => {
        const text = window.location.href;
        await onTextCopy(text);
    }, [levelId]);

    const onMapNameCopy = useCallback(async (name: Map['name']): Promise<void> => {
        const text = `!map ${name}`;
        await onTextCopy(text);
    }, [levelId]);

    const onMapImageModalOpen = useCallback(() => {
        dispatch(setIsMapImageModalOpen(true));
    }, []);

    const onMapImageModalClose = useCallback(() => {
        dispatch(setIsMapImageModalOpen(false));
    }, []);

    return {
        map,
        isMapImageModalOpen,
        onMapDelete,
        onToggleMapFavorite,
        onMapShare,
        onMapNameCopy,
        onMapImageUpdate,
        onMapImageModalOpen,
        onMapImageModalClose,
    };
};

