import { User } from '@/api/codegen/genMouseMapsApi';

export const useUserActions = () => {
    const onUsernameClick = (id: User['id']) => {
        alert('просмотр профиля пока не работает')
    }

    return {
        onUsernameClick
    };
};

