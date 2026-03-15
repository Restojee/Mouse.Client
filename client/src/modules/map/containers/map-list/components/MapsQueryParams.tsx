import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect } from "react";

export const MapsQueryParams = React.memo(() => {
  const router = useRouter();

  const { filter, updateFilter, updateQuery } = useFilterQueryParams();

  useEffect(() => {
    if (router.isReady && router.query.filter) {
      updateFilter(queryString.parse(router.query.filter as string));
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    updateQuery();
  }, [filter]);

  return null;
});
