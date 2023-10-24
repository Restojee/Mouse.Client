import { GetMapsApiArg } from '@/api/codegen/genMouseMapsApi';
import { useAppSelector } from '@/hooks/useAppSelector';
import useQueryParams from '@/hooks/useQueryParams';
import { selectCurrentUserId } from '@/modules/auth/slice';
import { useCallback } from 'react';

export const useMapNavigation = () => {
    const queryParams = useQueryParams();
    const userId = useAppSelector(selectCurrentUserId);

    const navigateTo = useCallback(async (query?: Partial<GetMapsApiArg> )  => {
        if (query?.isCompleted) {
            await queryParams.updateFilter({ ...query, userId, isFavorite: undefined });
            return;
        } else if (query?.isFavorite) {
            await queryParams.updateFilter({ ...query, userId, isCompleted: undefined });
            return;
        } else if (query?.isCompleted === false) {
            await queryParams.updateFilter({ ...query, userId, isFavorite: undefined });
            return;
        } else {
            await queryParams.removeQuery(['isCompleted', 'isFavorite', 'userId']);
            return;
        }
    }, [queryParams.updateQuery, queryParams.removeQuery, userId]);

    return {
        filters: queryParams.filter,
        navigateTo,
    };
};
