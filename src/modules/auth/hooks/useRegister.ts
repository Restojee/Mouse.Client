import { RegisterRequest } from '@/api/codegen/genMouseMapsApi';
import { setAppMessage, setAppModalType } from '@/bll/appReducer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useCallback } from 'react';
import { registerThunk } from '@/modules/auth/slice';

export const useRegister = () => {
  const dispatch = useAppDispatch();

  const onRegisterModalClose = useCallback(() => {
    dispatch(setAppModalType(null));
  }, []);

  const onRegisterModalOpen = useCallback(() => {
    dispatch(setAppModalType('register'));
  }, []);

  const register = async (data: RegisterRequest) => {
    try {
      const res = await dispatch(registerThunk(data));
      if (res.payload) {
        onRegisterModalClose();
      } else {
        throw new Error;
      }
    } catch (err) {
      dispatch(setAppMessage({severity: 'error', text: 'Ошибка регистрации'}))
    }
  };

  return {
    onRegisterModalClose,
    onRegisterModalOpen,
    register,
  };
};

