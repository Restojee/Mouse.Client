import queryString from 'query-string';
import React, { useEffect } from 'react';
import useQueryParams from '@/hooks/useQueryParams';
import { useRouter } from 'next/router';

// eslint-disable-next-line react/display-name
export const MapsQueryParams = React.memo(() => {
    const router = useRouter();

    const {
        filter,
        updateFilter,
        updateQuery,
    } = useQueryParams();

    useEffect(() => {
        if (router.isReady && router.query.filter) {
            updateFilter(queryString.parse(router.query.filter as string));
        }
    }, [router.isReady]);

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        console.log(2)
        updateQuery();
    }, [filter]);

    return null;
});

