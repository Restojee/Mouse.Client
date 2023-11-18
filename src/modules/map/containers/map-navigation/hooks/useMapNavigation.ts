import { GetMapsApiArg } from '@/api/codegen/genMouseMapsApi';
import { useAppSelector } from '@/hooks/useAppSelector';
import useQueryParams from '@/hooks/useQueryParams';
import { selectCurrentUserId } from '@/modules/auth/slice';
import { useCallback } from 'react';

export const useMapNavigation = () => {
    const queryParams = useQueryParams();

    const navigateTo = useCallback(async (query?: Partial<GetMapsApiArg> )  => {
        await queryParams.changeFilterNavigate({ ...query });
    }, [queryParams.changeFilterNavigate]);

    return {
        filters: queryParams.filter,
        navigateTo,
    };
};
