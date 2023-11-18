import { User } from '@/api/codegen/genMouseMapsApi';
import { setAppModalType } from '@/bll/appReducer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCurrentUser, selectCurrentUserId } from '@/modules/auth/slice';
import { selectStaticMapsInfo } from '@/modules/map/containers/map-list/slice';
import { selectOpenModalByUserId, selectUsers, setOpenModalByUserId, updateUserImageThunk } from '@/modules/user/slice';
import { useCallback, useMemo } from 'react';

export const useUser = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const myId = useAppSelector(selectCurrentUserId);
    const openModalByUserId = useAppSelector(selectOpenModalByUserId);
    const currentUser = useAppSelector(selectCurrentUser);
    const staticMapsInfo = useAppSelector(selectStaticMapsInfo);

    const getMapsPercent = useCallback((mapsCount: number = 0) => {
        const totalCount = staticMapsInfo?.totalItems || 0
        return (mapsCount / totalCount ) * 100
    }, [staticMapsInfo])

    const getUserById = useCallback((id: User['id']) => {
        return users?.find(el => el.id === id);
    }, [users]);

    const currentUserView = useMemo(() => {
        return users?.find(el => el.id === openModalByUserId);
    }, [openModalByUserId]);

    const onCloseUserModal = useCallback(() => {
        dispatch(setAppModalType(null));
        dispatch(setOpenModalByUserId(null));
    }, []);

    const onOpenUserModal = useCallback((id: User['id']) => {
        dispatch(setOpenModalByUserId(id));
        dispatch(setAppModalType('user'));
    }, []);

    const updateUserImage = useCallback((file: string) => {
        dispatch(updateUserImageThunk({file}));
    }, []);


    return {
        myId,
        users,
        currentUser,
        getUserById,
        updateUserImage,
        openModalByUserId,
        onCloseUserModal,
        onOpenUserModal,
        currentUserView,
        getMapsPercent
    };
};

