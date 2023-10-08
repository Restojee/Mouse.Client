import { LayoutContainer } from '@/layout/common/LayoutContainer';
import React from 'react';

export type LayoutProps = {
    children: React.ReactElement;
}

// eslint-disable-next-line react/display-name
export const withLayout = (Component: React.FC, layout: React.FC<LayoutProps>): React.FC => () => {
    return (
        <LayoutContainer layout={ layout }>
            <Component />
        </LayoutContainer>
    )
}