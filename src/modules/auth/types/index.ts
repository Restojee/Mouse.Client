import { User } from '@/api/codegen/genMouseMapsApi';

export type AuthStatusType = 'authenticated' | 'unauthenticated' | 'loading'

export type AuthStateType = {
    status: AuthStatusType | null,
    user: User | null,
    isAuth: boolean
}