import { useCallback } from 'react';
import { CreateTipApiArg, Tip, UpdateTipApiArg } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    createInfoThunk,
    selectInfoList,
    selectIsInfoFetching,
    selectIsInfoCreateModalOpen,
    setIsCreateModalOpen, removeInfoThunk, updateInfoThunk, selectSelectedInfo, setSelectedInfo,
} from '@/modules/info/slice';

export const useInfo = () => {
    const dispatch = useAppDispatch();
    const infoList = useAppSelector(selectInfoList);
    const isInfoCreateModalOpen = useAppSelector(selectIsInfoCreateModalOpen);
    const isInfoFetching = useAppSelector(selectIsInfoFetching);
    const selectedInfo = useAppSelector(selectSelectedInfo);

    const onModalClose = useCallback(() => {
        dispatch(setIsCreateModalOpen(false));
        dispatch(setSelectedInfo(null));
    }, []);

    const onModalOpen = useCallback(() => {
        dispatch(setIsCreateModalOpen(true));
    }, []);

    const createInfo = useCallback(async (arg: CreateTipApiArg) => {
        const isCreated = await dispatch(createInfoThunk(arg));
        if (isCreated.payload) {
            onModalClose();
        }
    }, []);

    const updateInfo = useCallback(async (arg: UpdateTipApiArg) => {
        const isCreated = await dispatch(updateInfoThunk(arg));
        if (isCreated.payload) {
            onModalClose();
        }
    }, []);

    const removeInfo = useCallback(async (id: Tip['id']) => {
        if (id) {
            await dispatch(removeInfoThunk({ tipId: id }));
        }
    }, []);

    const selectInfo = useCallback(async (info: Tip) => {
        dispatch(setSelectedInfo(info));
        onModalOpen();
    }, []);

    return {
        infoList,
        createInfo,
        updateInfo,
        removeInfo,
        selectInfo,
        onModalOpen,
        onModalClose,
        selectedInfo,
        isInfoFetching,
        isInfoCreateModalOpen,
    };
};

