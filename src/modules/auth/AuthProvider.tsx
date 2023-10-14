import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getCurrentUserThunk, selectIsAuth } from '@/modules/auth/slice';
import { ReactElement, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useSelector } from 'react-redux';

type AuthProviderProps = {
    children: ReactElement;
}
export const AuthProvider = (props: AuthProviderProps) => {
    const dispatch = useAppDispatch();
    const session = useSession();
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(getCurrentUserThunk())
    }, [isAuth])

    return props.children;
}