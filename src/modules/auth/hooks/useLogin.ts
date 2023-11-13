import { LoginRequest } from '@/api/codegen/genMouseMapsApi';
import { setAppMessage, setAppModalType } from '@/bll/appReducer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useCallback } from 'react';
import { loginThunk, logoutThunk } from '@/modules/auth/slice';

export const useLogin = () => {
    const dispatch = useAppDispatch();


    const onLoginModalClose = useCallback(() => {
        dispatch(setAppModalType(null));
    }, []);

    const onLoginModalOpen = useCallback(() => {
        dispatch(setAppModalType('login'));
    }, []);

    const login = async (data: LoginRequest) => {
        try {
            const res = await dispatch(loginThunk(data));
            if (res.payload) {
                onLoginModalClose();
            } else {
                throw new Error;
            }
        } catch (err) {
            dispatch(setAppMessage({severity: 'error', text: 'Ошибка авторизации'}))
        }
    };

    const logout = async () => {
        dispatch(logoutThunk());
    };

    return {
        onLoginModalClose,
        onLoginModalOpen,
        login,
        logout,
    };
};

