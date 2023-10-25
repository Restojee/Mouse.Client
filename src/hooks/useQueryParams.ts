import { GetMapsApiArg } from '@/api/codegen/genMouseMapsApi';
import { removeKeysFromObject } from '@/common/utils/removeKeysFromObject';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useCallback, useMemo } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectFilter, setFilter, updateFilter as updateStateFilter } from '@/modules/map/containers/map-list/slice';
import { useRouter } from 'next/router';
import queryString from 'query-string';

const useQueryParams = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(selectFilter);

    const query = useMemo((): Partial<GetMapsApiArg> => {
        return queryString.parse(router.query.filter as string) as Partial<GetMapsApiArg>
    }, [router.query])

    const updateQuery = useCallback(async () => {
        await router.push({ query: { filter: queryString.stringify(filter, { skipEmptyString: true }) } });
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
        query,
        updateFilter,
        updateQuery,
        removeQuery,
    };
};

export default useQueryParams;