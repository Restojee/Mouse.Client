import { ReactElement, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getCurrentUserThunk, selectIsAuth } from '@/modules/auth/slice';

type AuthProviderProps = {
    children: ReactElement;
}
export const AuthProvider = (props: AuthProviderProps) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);

    useEffect(() => {
        const id = setInterval(() => {
            dispatch(getCurrentUserThunk())
        }, 300000)

        return () => {
            clearInterval(id)
        }
    }, [])

    useEffect(() => {
        dispatch(getCurrentUserThunk())
    }, [isAuth]);

    return props.children;
}