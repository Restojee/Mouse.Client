import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { removeKeysFromObject } from "@/common/utils/removeKeysFromObject";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCurrentUserId } from "@/modules/auth/slice";
import { selectFilter, setFilter, updateFilter as updateStateFilter } from "@/modules/map/containers/map-list/slice";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useCallback, useMemo } from "react";

const useFilterQueryParams = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectCurrentUserId);
  const filter = useAppSelector(selectFilter);

  const staticFilters: Partial<GetMapsApiArg> = useMemo(
    () => ({
      page: 1,
      size: 30,
      userId,
    }),
    [userId],
  );

  const query = useMemo((): Partial<GetMapsApiArg> => {
    return queryString.parse(router.query.filter as string) as Partial<GetMapsApiArg>;
  }, [router.query.filter]);

  const updateQuery = useCallback(async () => {
    await router.push({
      query: {
        ...router.query,
        filter: queryString.stringify(filter, { skipEmptyString: true }),
      },
    });
  }, [router, filter]);

  const removeQuery = useCallback(
    async (query: Array<keyof GetMapsApiArg>) => {
      const updatedQuery = removeKeysFromObject(filter, query) as GetMapsApiArg;
      dispatch(setFilter(updatedQuery));
    },
    [dispatch, filter],
  );

  const changeFilterNavigate = useCallback(
    async (newFilter?: Partial<GetMapsApiArg>) => {
      const filter = { ...staticFilters, ...newFilter };

      dispatch(setFilter(filter));
    },
    [dispatch, staticFilters],
  );

  const updateFilter = useCallback(
    async (newFilter: Partial<GetMapsApiArg>) => {
      dispatch(updateStateFilter(newFilter));
    },
    [dispatch],
  );

  return {
    filter,
    query,
    updateQuery,
    removeQuery,
    updateFilter,
    router,
    changeFilterNavigate,
  };
};

export default useFilterQueryParams;
