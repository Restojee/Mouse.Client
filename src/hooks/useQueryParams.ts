import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";
import { useCallback } from "react";

export const useQueryParams = () => {
  const router = useRouter();

  const updateQuery = useCallback(
    async (newQuery: ParsedUrlQueryInput) => {
      await router.replace(
        {
          pathname: router.pathname,
          query: newQuery,
        },
        undefined,
        { shallow: true },
      );
    },
    [router],
  );

  const addQueryParam = useCallback(
    async (param: string, value: string) => {
      const newQuery = { ...router.query, [param]: value };
      await updateQuery(newQuery);
    },
    [router.query, updateQuery],
  );

  const removeQueryParam = useCallback(
    async (param: string) => {
      const newQuery = { ...router.query };
      delete newQuery[param];
      await updateQuery(newQuery);
    },
    [router.query, updateQuery],
  );

  const updateQueryParam = useCallback(
    async (param: string, value: string) => {
      const newQuery = { ...router.query, [param]: value };
      await updateQuery(newQuery);
    },
    [router.query, updateQuery],
  );

  const clearAllQueryParams = useCallback(async () => {
    await updateQuery({});
  }, [updateQuery]);

  return { query: router.query, addQueryParam, removeQueryParam, updateQueryParam, clearAllQueryParams };
};
