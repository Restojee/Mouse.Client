import { routes } from '@/common/routes';
import { useRouter } from 'next/router';

export type NavigationQueryType = 'completed' | 'favorites' | ''

export const useMapNavigation = () => {
    const router = useRouter();

    const navigateTo = async (query: NavigationQueryType) => {
        if (query.length) {
            await router.push({
                pathname: routes.MAPS,
                query: { filter: query },
            });
        } else {
            await router.push({
                pathname: routes.MAPS,
                query: {},
            });
        }
    };

    return {
        navigateTo,
    };
};

