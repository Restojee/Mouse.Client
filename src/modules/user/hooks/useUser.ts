import { User } from '@/api/codegen/genMouseMapsApi';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCurrentUserId } from '@/modules/auth/slice';
import { selectUsers } from '@/modules/user/slice';
import { useCallback } from 'react';

export const useUser = () => {
    const users = useAppSelector(selectUsers);
    const myId = useAppSelector(selectCurrentUserId)

    const getUserById = useCallback((id: User['id']) => {
        return users?.find(el => el.id === id);
    }, [users]);

    return {
        myId,
        users,
        getUserById,
    };
};

