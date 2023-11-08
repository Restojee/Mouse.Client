import { User } from '@/api/codegen/genMouseMapsApi';
import { setAppModalType } from '@/bll/appReducer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCurrentUserId } from '@/modules/auth/slice';
import { selectOpenModalByUserId, selectUsers, setOpenModalByUserId } from '@/modules/user/slice';
import { useCallback, useMemo } from 'react';

export const useUser = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const myId = useAppSelector(selectCurrentUserId)
    const openModalByUserId = useAppSelector(selectOpenModalByUserId)

    const getUserById = useCallback((id: User['id']) => {
        return users?.find(el => el.id === id);
    }, [users]);

    const currentUserView = useMemo(() => {
        return users?.find(el => el.id === openModalByUserId);
    }, [openModalByUserId]);

    const onCloseUserModal = useCallback(() => {
        dispatch(setAppModalType(null));
        dispatch(setOpenModalByUserId(null))
    }, []);

    const onOpenUserModal = useCallback((id: User['id']) => {
        dispatch(setOpenModalByUserId(id))
        dispatch(setAppModalType('user'))
    }, [])


    return {
        myId,
        users,
        getUserById,
        openModalByUserId,
        onCloseUserModal,
        onOpenUserModal,
        currentUserView
    };
};

