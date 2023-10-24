import { GetMapsApiArg } from '@/api/codegen/genMouseMapsApi';
import { removeKeysFromObject } from '@/common/utils/removeKeysFromObject';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useCallback } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectFilter, setFilter, updateFilter as updateStateFilter } from '@/modules/map/containers/map-list/slice';
import { useRouter } from 'next/router';
import queryString from 'query-string';

const useQueryParams = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(selectFilter);

    const updateQuery = useCallback(async () => {
        await router.push('?' + queryString.stringify(filter));
    }, [router, filter]);

    const removeQuery = useCallback(async (query: Array<keyof GetMapsApiArg>) => {
        const updatedQuery = removeKeysFromObject(filter, query) as GetMapsApiArg;
        dispatch(setFilter(updatedQuery));
    }, [filter]);

    const updateFilter = useCallback(async (newFilter: Partial<GetMapsApiArg>) => {
        dispatch(updateStateFilter(newFilter));
    }, []);

    return {
        filter,
        updateFilter,
        updateQuery,
        removeQuery
    };
};

export default useQueryParams;