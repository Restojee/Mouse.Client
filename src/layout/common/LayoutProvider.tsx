import { LayoutContext } from '@/layout/common/LayoutContext';
import { LayoutDefault } from '@/layout/common/LayoutDefault';
import { LayoutProps } from '@/layout/common/withLayout';
import * as React from 'react';

type LayoutProviderProps = {
    children: React.ReactElement;
}
export const LayoutProvider: React.FC<LayoutProviderProps> = (props) => {

    const [ Layout, setLayout ] = React.useState<React.FC<LayoutProps>>(() => LayoutDefault);

    return (
        <LayoutContext.Provider value={ { layout: Layout, setLayout } }>
            <Layout>
                { props.children }
            </Layout>
        </LayoutContext.Provider>
    )
}