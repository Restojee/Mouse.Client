import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

export const MapsQueryParams = React.memo(() => {
  const router = useRouter();
  const { filter, updateQuery } = useFilterQueryParams();
  const isFirstFilterRunRef = useRef(true);

  useEffect(() => {
    if (!router.isReady) return;
    if (isFirstFilterRunRef.current) {
      isFirstFilterRunRef.current = false;
      return;
    }
    updateQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, router.isReady]);

  return null;
});
