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
        if (router.isReady) {
            updateFilter(router.query);
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

