import { LoginRequest } from '@/api/codegen/genMouseMapsApi';
import { setAppModalType } from '@/bll/appReducer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useCallback } from 'react';
import { loginThunk } from '@/modules/auth/slice';

export const useLogin = () => {
    const dispatch = useAppDispatch();


    const onLoginModalClose = useCallback(() => {
        dispatch(setAppModalType(null));
    }, []);

    const onLoginModalOpen = useCallback(() => {
        dispatch(setAppModalType('login'));
    }, []);

    const login = async (data: LoginRequest) => {
        const res = await dispatch(loginThunk(data));
        if (res.payload) {
            onLoginModalClose();
        }
    };

    const logout = async () => {
        alert('Разлогиниться пока невозможно..')
    };

    return {
        onLoginModalClose,
        onLoginModalOpen,
        login,
        logout,
    };
};

